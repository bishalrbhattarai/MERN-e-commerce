const { showError } = require('../../lib')
const { Brand } = require('../../models')

class BrandsController {
    index = async (req, res, next) => {
        try{
            const brands = await Brand.find()
            
            res.json(brands)
        }catch(err){
            showError(err, next)
        }
    }

    store = async (req, res, next) => {
        try{
            const {name, status} = req.body
            await Brand.create({name, status})

            res.json({
                success:'Brand Added'
            })
        }catch(err){
            showError(err, next)
            }
    }

    show = async (req, res, next) => {
        try{
            const brand = await Brand.findById(req.params.id)

            res.json(brand)
        }catch(err){
            showError(err, next)
        }
    }

    update = async (req, res, next) => {
        try{
            const {name, status} = req.body
            
            await Brand.findByIdAndUpdate(req.params.id, {name, status})

            res.json({
                message: 'Brand Updated'
            })

        }catch(err){
            showError(err, next)
        }  
    }

    destroy = async (req, res, next) => {
        try{
            await Brand.findByIdAndDelete(req.params.id)

            res.json({
                message: 'Brand deleted'
            })

        }catch(err){
            showError(err, next)
        }  
    }

}

module.exports = new BrandsController