export default function handler(req, res) {
    let error;
    try{
        console.log("START")
        console.log("REQ", req)
        const { command } = req.query
        const responseUrl = req.headers['Nightbot-Response-Url']
        const user = req.headers['Nightbot-User'] ? new URLSearchParams(req.headers['Nightbot-User']) : null
        const channel = req.headers['Nightbot-Channel'] ? new URLSearchParams(req.headers['Nightbot-Channel']) : null
    
        if(user){
            //DO SOMETHING
        }

        return res.json({
          message: `${command} - ${responseUrl} - ${JSON.stringify(req.headers)} - ${JSON.stringify(req)}`,
        })
    }catch(e){
        console.log(e)
        error = e
    }
    return res.json({
        message: `ERROR ${error}`,
    })

  }