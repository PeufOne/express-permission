var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
let session = require('express-session')
let mongoose = require('mongoose')
let MongoStore = require('connect-mongo')(session)

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express()

try {
	mongoose.connect('mongodb://localhost:27017/express-permission', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
}catch (error) {
	console.log(error)
}

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
	secret: 'TA_MERE_EST_TELLEMENT_PAUVRE_QU_ELLE_MARCHE_DANS_LA_RUE_AVEC_UNE_SEUL_CHAUSSURE',
    cookie: {maxAge: 72*60*60*1000},
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: true
}))

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use((err, req, res, next) => {
    if (!err) return next()
    console.log(err)
    res.json({error: true, message: err.message || err})
})

module.exports = app
