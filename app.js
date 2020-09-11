const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose')
const app=express()
const passportSetupGG = require('./passport-config/passport-setup-gg')
const passportSetupFB = require('./passport-config/passport-setup-fb')
const cookieSession= require('cookie-session')
const keys= require('./config/keys')
const passport = require('passport')
const port = process.env.PORT || 4000
//set view engine
app.set('view engine','ejs')
//encrypting cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 *1000,
    keys:[keys.session.cookieKey]
})
)
//passport initialise session
app.use(passport.initialize())
app.use(passport.session())

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI,{useNewUrlParser:true, useUnifiedTopology: true})
const authRoutes = require('./routes/auth-routes')
app.use('/auth',authRoutes)
const profileRoutes = require('./routes/profile-routes')
app.use('/profile',profileRoutes)
app.get('/',(req,res)=>{
    res.render('home',{user:req.user})
})
app.listen(port,()=>{
    console.log('Server is up on port',port);
})