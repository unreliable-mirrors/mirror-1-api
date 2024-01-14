const _invoque_method = async (req, res, callback) => {
    const {response} = await callback(req)
    console.log("RESPONSE", response)
    res.json(response)
}

const wrapped_method = (callback) => {
    return async (req, res) => {
        _invoque_method(req, res, callback)
    }
}

const cached_method = (method_name, callback, ttl = 60) => {
    console.log("REGISTERING ", method_name)
    return async (req, res) => {
        //console.log(req)
        //TODO: CACHE LOGIC
        //if(cache present?){
        //    CHACHE MAGIC
        //}else{
            _invoque_method(req, res, callback)
        //∫}
    }
}

module.exports = {cached_method, wrapped_method}