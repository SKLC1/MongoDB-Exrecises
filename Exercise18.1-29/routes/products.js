import express from 'express'
export const router = express.Router()
import product from '../models/product.js'

 router.get('/',async(req,res)=>{
  try{
    const products = await product.find()
    res.json(products)
  }catch(e){
    res.status(400).json({message: err.message})
  }
})
router.get('/:id',async(req,res)=>{
  try{
    const products = await product.find(req.params.id)
    res.json(products)
  }catch(e){
    res.status(400).json({message: err.message})
  }
 })
 router.post('/',async(req,res)=>{
   const productBodyToSve =  req.body;
   const newProduct =  new product({
    name:req.body.name,
  category: req.body.category,
  details: {
    description: req.body.description, 
    price: req.body.price, 
    discount: req.body.discount, 
    images: req.body.images,
    phone: req.body.phone,
    date: req.body.date,
   }})
   try{
    res.status(201).json(newProduct)
  } catch(err){
     res.status(400).json({message: err.message})
   }
 })

 