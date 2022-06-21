import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import {router} from './routes/products.js'
const app = express()
app.use(express.json())
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true})
const db = mongoose.connection
db.on('error',(error)=>console.log(error))

app.use('/products', router)
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('server running'))
