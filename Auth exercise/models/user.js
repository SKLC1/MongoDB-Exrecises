import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userScheme  = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  password: { type: String, required: true}
})

userScheme.pre('save',async function(next) {
  try{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword;
    next()
  } catch(e){
    console.log(e);
    next()
  }
})
// hash password
userScheme.methods.comparePassword = async function (password) {
  if(!password) throw new Error('no password')
  try{
   const result = await bcrypt.compare(password, this.password)
   return result;
  } catch (err) {
   console.log(err);
  }
}

export default mongoose.model('user', userScheme)
