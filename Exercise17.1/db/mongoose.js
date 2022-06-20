import mongoose from "mongoose"

mongoose.connect('mongodb://127.0.0.1:27017/products')



const product = mongoose.model('product',{
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
      default: ()=> new Date.now(),
    }
  },
})


async function run(){
  const newProduct = await product.create({
    name: "Dog Chew Toys for Puppy ", 
    category:"Dog ", 
    details: {
      description: 'Treat Balls and Dog Squeaky Toy for Puppy and Small Dogs',
      price: 22.99,
      discount: 1,
      images: ['image1sec','image2src','image3src'],
      phone: '+972664545755',
    }
  })
  console.log(newProduct);
}
run()