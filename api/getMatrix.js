const {kv} = require("@vercel/kv")
const width = 100
const height = 100

export default async function handler(req, res) {
    console.log("START", req.query)
    console.log("params", req.query)
    
    const commands = await kv.lrange('RECENT_PAINT_COMMANDS', 0, -1)
    await kv.del('RECENT_PAINT_COMMANDS')
    return res.json({response: {
        commands: commands,
        matrix: await kv.lrange('MATRIX', 0, -1),
    }})
}