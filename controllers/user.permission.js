function post(req, res, next) {
    next()
}

function get(req, res, next) {

    //Public fields
    let fields = ['name', 'age', 'public']

    //Personal fields
    if (req.session.user){
        console.log(req.session.user)
        if (req.session.user._id === req.query._id) fields.push('secret')
    }

    req.fields = fields
    return next()
}

function put(req, res, next) {

    //Public fields
    let fields = ['public']

    //Personal fields
    if (req.session.user) {
        if (req.session.user._id === req.query._id) fields.push('name', 'age', 'secret')
    }

    req.fields = Object.keys(req.body).filter(key => fields.includes(key))
    
    if (req.fields.length < Object.keys(req.body).length)
        return next(Error(`Unauthorized fields: "${Object.keys(req.body).filter(key => !fields.includes(key)).join(', ')}"`))
    return next()
}



const routes = {
    POST: post,
    GET: get,
    PUT: put
}

module.exports = function(req, res, next) {
    if (routes[req.method]) return routes[req.method](req, res, next)
    return next(Error('Denied'))
}
