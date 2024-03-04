const  express  = require("express")
const { config } = require("dotenv")
const Routes = require("./Routes/index.js")
const mongoose =require( "mongoose")
const cors = require("cors")

config()

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use (Routes)

app.use((error, req, res, next) =>{
    res.status(error.status || 500).json({
        error: error.message || 'Problem while executing request'
    })
})

const listner = app.listen(process.env.API_PORT, process.env.API_HOST, async () =>{
    console.log(`Server started at http://${listner.address().address }:${listner.address().port} `)
    console.log('press ctrl C to stop')


    try{
        await mongoose.connect(process.env.MONGO_ADDR)
        console.log('Mongodb connected')
    }catch(err){
        console.error('Promblem while connecting mongodb')
    }
})