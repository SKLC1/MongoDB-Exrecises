import mongoose from 'mongoose'

const productScheme  = {
  name: { type: String, required: true},
  category: { type: String, required: true},
  details: {
    description: { type: String, required: true, min: 10 }, //atleast 10 letters
    price: { type: Number, required: true}, // validate positive
    discount: { type: Number, default: 0}, //not reqiered, default is 0
    images: {type: [String], validate:{
      validator: v => v.length >= 2,
      message: props => `${props} has less than 2 images`
    }},
    phone: {type: String, validate:{
      validator: v => v.slice(0,4) === '+972',
      message: props => `${props} is not an israeli phone number`
    }},
    date: {
      type: Date,
      immutable: true,
      default: ()=> new Date(),
    }
  },
};


export default mongoose.model('product', productScheme)
