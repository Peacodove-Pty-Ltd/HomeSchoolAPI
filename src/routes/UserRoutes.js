const router = require('express').Router()
const userCtrl = require('../controllers/userController')

router.post('/register', userCtrl.register)

router.post('/activation', userCtrl.activateEmail)

router.post('/login', userCtrl.login)

router.post('/refresh_token', userCtrl.getAccessToken)

router.post('/forgot', userCtrl.forgotPassword)

router.post('/reset', userCtrl.resetPassword)

router.get('/info', userCtrl.getUserInfo)

router.get('/logout', userCtrl.logout)

router.delete('/delete/:id', userCtrl.deleteUser)


// Social Login
router.post('/google_login', userCtrl.googleLogin)

router.post('/facebook_login', userCtrl.facebookLogin)


module.exports = router