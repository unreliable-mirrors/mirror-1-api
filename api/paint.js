export default function handler(req, res) {
    console.log("START")
    console.log("REQ", req)
    const { command } = req.query
    let error;
    try{
        const responseUrl = req.headers.get('Nightbot-Response-Url')
        const user = req.headers.get('Nightbot-User') ? new URLSearchParams(req.headers.get('Nightbot-User')) : null
        const channel = req.headers.get('Nightbot-Channel') ? new URLSearchParams(req.headers.get('Nightbot-Channel')) : null
    
        if(user){
            //DO SOMETHING
        }
    }catch(e){
        console.log(e)
        error = e
    }

    return res.json({
      message: `${command} - ${error}`,
    })
  }