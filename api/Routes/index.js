const  express  = require("express")

const authRoutes =require( "./auth")
const cmsRoutes =require( "./cms")
const frontRoutes =require( "./front")
const profileRoutes =require( "./profile")
const { Auth } = require("../controllers")
const { auth, adminStaff, customerOnly } = require("../lib")
const {Profile} = require('../controllers')

const router = express.Router()

router.use('/auth',authRoutes)

router.use('/cms',auth, adminStaff, cmsRoutes)

router.use('/profile',auth, profileRoutes)

router.use('/checkout',auth, customerOnly, Profile.checkout)


router.get ('/image/:filename', (req, res, next) =>{
    res.sendFile(`uploads/${req.params.filename}`,{
        root : "../api"
    })
})

router.use(frontRoutes)

router.use((req, res, next) => {
    next({
        message: 'resource not found',
        status: 404
    })
})

module.exports = router