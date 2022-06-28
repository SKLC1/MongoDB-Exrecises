import express from 'express'
import { ObjectId } from 'mongodb'
import user from '../models/user.js'

export const router = express.Router()

 router.get('/',async(req,res)=>{
  try{
    const users = await user.find()
    res.json(users)
  }catch(e){
    res.status(400).json({message: err.message})
  }
})
router.get('/:id',async(req,res)=>{
  try{
    const users = await user.findById(req.params.id)
    res.json(users)
  }catch(err){
    res.status(400).json({message: err.message})
  }
 })
 router.post('/',async(req,res)=>{
   const userToSave = req.body;
   const newUser =  new user({
    name:req.body.name,
    password: req.body.password,
  })
   try{
    await newUser.save()
    res.status(201).json(newUser)
  } catch(err){
    res.status(400).json({message: err.message})
  }
})
router.patch('/:id',async(req,res)=>{
  const userToUpdate = await user.findById(req.params.id)
  const updates = Object.keys(req.body);
  const allowed = ["name", "password"];
  const isValid = updates.every((update) => allowed.includes(update));
  try{ 
    if (!isValid) throw new Error("operation not valid");
    updates.forEach(update => {
      userToUpdate[update] = req.body[update]
    });
     res.status(201).json(userToUpdate)
    } catch(e){
      res.status(400).json({message: err.message})
    }
 })
router.get('/login',async(req,res)=>{
  const pass = (req.body.pass)
  const validPassword = await bcrypt.compare(pass, user.password);
  const users = await user.find()
  try {
    if (!validPassword){
      return res.status(400).send('Invalid Email or Password.')
    } else {
    res.json(users)
    }
} catch (error) {
    console.log(error);
  }
})