export default function handler(req, res) {
    const { command } = req.query
    const responseUrl = req.headers.get('Nightbot-Response-Url')
    const user = req.headers.get('Nightbot-User') ? new URLSearchParams(req.headers.get('Nightbot-User')) : null
    const channel = req.headers.get('Nightbot-Channel') ? new URLSearchParams(req.headers.get('Nightbot-Channel')) : null

    if(user){
        //DO SOMETHING
    }

    return res.json({
      message: `${command}`,
    })
  }