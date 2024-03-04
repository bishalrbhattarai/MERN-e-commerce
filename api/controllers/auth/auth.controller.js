const { showError } = require("../../lib")
const { User } = require("../../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



class AuthController{
    register = async (req, res, next) =>{
        try{
            const {name, email, password, confirm_password, address, phone} = req.body
            if(password == confirm_password){

            const hash = bcrypt.hashSync(password,bcrypt.genSaltSync(10))
            await User.create({name, email, password:hash, address, phone})


            res.json({
                message:'Thank you for registering. Please Log In to your account.'
            })
            }else{
                next({
                    message:"password not confirmed",
                    status: 422,
                })
            }
        }catch(error){
            showError(error, next)
        }
    }

 
    
    login = async (req, res, next) =>{
        try{
            const { email, password} = req.body

            const user = await User.findOne({email}).exec()

            if (user){
                if(bcrypt.compareSync(password, user.password)){
                   if(user.status){
                    const token = jwt.sign({id: user._id, iat: Math.floor(Date.now() / 1000) - 30, exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60 )}, process.env.JWT_SECRET)
                    res.json({token, user})
                    }else{
                        next({
                            message:'inactive account',
                            status: 422
                            })
                    }
                }
                else{
                    next({
                    message:'password incorrect',
                    status: 422
                    })
                }
            }else{
                next({
                    message:'given email is not registered in out database',
                    status: 422
                })
            }
        }catch(error){
            showError(error, next)
        }
    }
}

module.exports = new AuthController