const express = require('express')
const router = express.Router()
const permission = require('../controllers/user.permission.js')
const user = require('../controllers/user.js')

router
    .use(permission)
    .post('/', user.create)
    .post('/login', user.login)
    .get('/logout', user.logout)
    .get('/', user.get)
    .put('/', user.put)

module.exports = router
