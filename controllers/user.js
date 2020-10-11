const User = require('../models/user.js')

exports.create = async function(req, res, next) {
    try {
        let { name } = req.body
        if (!name) throw Error('Field "name" is required on the body')
        let user = await new User({name}).save()
        res.json(user)
    }catch(error){next(error)}
}

exports.login =  async function(req, res, next) {
    try {
        let { name } = req.body
        if (!name) throw Error('Field "name" is required on the body')
        let user = await User.findOne({name}).exec()
        if (!user) throw Error('User not found')
        req.session.user = user
        res.json(user)
    }catch(error){next(error)}
}

exports.logout = async function(req, res, next) {
    req.session.user = undefined
    res.json({success: true, message: 'User is logout'})
}

exports.get = async function(req, res, next) {
    try {
        let users = await User.find(req.query, req.fields).exec()
        res.json(users)
    }catch(error){next(error)}
}

exports.put = async function(req, res, next) {
    try {
        let users = await User.find(req.query, req.fields).exec()
        await Promise.all(users.map(user => {
            for (field in req.body) {
                user[field] = req.body[field] || undefined
            }
            return user.save()
        }))
        res.json(users)
    }catch(error){next(error)}
}
