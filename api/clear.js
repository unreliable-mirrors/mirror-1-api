const {kv} = require("@vercel/kv")

export default async function handler(req, res) {
    console.log("START", req.query)
    console.log("params", req.query)
    
    const result = await kv.flushall()

    return res.json({response: {
        ok: "true",
        result: result
    }})
}