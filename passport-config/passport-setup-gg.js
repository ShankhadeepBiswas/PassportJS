const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local')
const {GGuser} = require('../models/user-model')

passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    GGuser.findById(id).then((user)=>{
        done(null,user)
    })
})
passport.use(
    new GoogleStrategy({
        //google strat options object
        callbackURL:process.env.google_callbackURL,
        clientID : process.env.google_clientID,
        clientSecret: process.env.google_clientSecret
    },async(accessToken,refreshToken,profile,done)=>{
        //passport callback
       // console.log(profile);
        const user = await GGuser.findOne({GoogleID:profile.id})
        if(user){
            console.log("User Already Logged in! ",user);
            done(null,user)
        }else{
        const newUser = await new GGuser({
            Profilename: profile.displayName,
            GoogleID:profile.id,
            thumbnail:profile._json.picture
        }).save()
        done(null,newUser)
        console.log("New User Created and Logged in",newUser);
    }
    })
)
// passport.use(new LocalStrategy(
//     (username, password, done)=> {
//         return done(null, username);
//       }))
