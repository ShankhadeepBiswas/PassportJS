const router= new require('express').Router()
const passport = require('passport')
router.get('/login',(req,res)=>{
    res.render('login',{user:req.user})
})
//Google
router.get('/google',passport.authenticate('google',{
        scope:['profile']
    })
)
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.render('profile',{user:req.user})
})
//Facebook
router.post('/facebook',passport.authenticate('facebookToken',{session:false}))
router.get('/facebook',passport.authenticate('facebook',{
    scope:['profile']
})
);
router.get('/facebook/redirect',passport.authenticate('facebook',{failureRedirect:'/auth/login',successRedirect:'/auth/profile'}))
router.get('/logout',(req,res)=>{
    req.logOut()
    res.redirect('/')
})
//Local
//router.get('/local',passport.authenticate('local',{failureRedirect:'/auth/login', successRedirect:'/auth/profile'}))
module.exports = router