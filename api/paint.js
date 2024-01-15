const {kv} = require("@vercel/kv")
const width = 100
const height = 100

export default async function handler(req, res) {
    console.log("START", req.query)
    console.log("params", req.query)
    
    let {command, userId} = req.query
    command = command.trim().toUpperCase()
    const commandSplit = command.split(" ")
    if(commandSplit.length != 3){
        return res.json({message: "INVALID MESSAGE", command, commandSplit})
    }

    const x = commandSplit[0]*1
    const y = commandSplit[1]*1
    const color = commandSplit[2].replace(/[^A-Fa-f0-9]/g, "").slice(0,6);
    
    const user = req.headers["nightbot-user"] ? new URLSearchParams(req.headers["nightbot-user"]) : null
    const name = user.get("name")
    const displayName = user.get("displayName")
    const subscribed = await kv.get(`SUBSCRIBED_${userId}`)
    const blocked = await kv.get(`BLOCKED_${userId}`)

    const userBits = await kv.get(`BITS_${userId}`)

    const currentBits = await kv.get("CURRENT_BITS")

    if(!blocked && userId && x != null && y != null && color){
        let ex = 60
        if(subscribed){
            ex = 10
        }
        await kv.set(`BLOCKED_${userId}`, "1", {ex: ex})

        const time = Date.now()

        const commandObj = {x, y, color, userBits, currentBits, time}
        await kv.rpush('ALL_PAINT_COMMANDS', command)
        await kv.rpush('RECENT_PAINT_COMMANDS', command)
        await kv.rpush(`USER_PAINT_COMMANDS_${userId}`, command)
        await kv.sadd(`USERS`, {userId, name, displayName})
        await kv.sadd(`USERS`, {userId, name, displayName})
        try{
            await kv.del('MATRIX')
            await kv.lset(`MATRIX`, ((y%height)*width)+(x%width), color)
        }catch(e){
            await kv.rpush('MATRIX', ...Array(10000).fill("0"))
            console.log(kv.lrange('MATRIX', 0, -1))
            await kv.lset(`MATRIX`, ((y%height)*width)+(x%width), color)
        }
    }else{
        console.log("SKIPPED")
    }


    return res.json({response: {
        query: req.query,
        command: {command, x, y, color},
        user: {userId, user, name, displayName, subscribed, blocked, userBits, currentBits},
        headers: {
            "Nightbot-Response-Url": req.headers["nightbot-response-url"],
            "Nightbot-User": user,
            "Nightbot-Channel": req.headers["nightbot-channel"],
        },
        commands: await kv.lrange('RECENT_PAINT_COMMANDS', 0, -1),
        matrix: await kv.lrange('MATRIX', 0, -1),
    }})
}