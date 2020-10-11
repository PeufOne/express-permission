var express = require('express')
var router = express.Router()

/* GET home page. */
router
    .get('/', function(req, res, next) {
        res.render('index', { title: 'Express' })
    })
    .get('/query', (req, res, next) => {
        let { query, body } = req
        res.json({query, body})
    })

module.exports = router
