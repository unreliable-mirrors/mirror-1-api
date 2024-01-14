const application_controller = require("./application_controller")

const index = async (req) => {
    console.log("START", req.query)
    console.log("params", req.query)
    return {response: {
        query: req.query,
        headers: {
            "Nightbot-Response-Url": req.headers["nightbot-response-url"],
            "Nightbot-User": req.headers["nightbot-user"],
            "Nightbot-Channel": req.headers["nightbot-channel"]
        }
    }}
}

module.exports = {...application_controller, index}