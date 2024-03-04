const { showError } = require('../../lib')
const { User } = require('../../models')
const bcrypt = require("bcryptjs")

class StaffsController {
    index = async (req, res, next) => {
        try{
            const staffs = await User.find({type: 'Staff'}).exec()
            
            res.json(staffs)
        }catch(err){
            showError(err, next)
        }
    }

    store = async (req, res, next) => {
        try{
            const {name, email, password, confirm_password, address, phone, status} = req.body
            if(password == confirm_password){

            const hash = bcrypt.hashSync(password,bcrypt.genSaltSync(10))
            await User.create({name, email, password:hash, address, phone, status, type:'Staff', status})


            res.json({
                message:'Staff Added'
            })
            }else{
                next({
                    message:"password not confirmed",
                    status: 422,
                })
            }
        }catch(err){
            showError(err, next)
        }
    }

    show = async (req, res, next) => {
        try{
            const staff = await User.findById(req.params.id)

            res.json(staff)
        }catch(err){
            showError(err, next)
        }
    }

    update = async (req, res, next) => {
        try{
            const {name, address, phone, status} = req.body
            
            await User.findByIdAndUpdate(req.params.id, {name, address, phone, status})

            res.json({
                message: 'User Updated'
            })

        }catch(err){
            showError(err, next)
        }  
    }

    destroy = async (req, res, next) => {
        try{
            
            await User.findByIdAndDelete(req.params.id)

            res.json({
                message: 'staff deleted'
            })

        }catch(err){
            showError(err, next)
        }  
    }

}

module.exports = new StaffsController