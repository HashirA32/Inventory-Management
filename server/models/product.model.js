import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    auther:{
          type:  mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name:{
        type:  String,
        required: true,
        trim: 'true'
    },
    category: {
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    stock: {
        type: Number,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    featureImage: {
        type: String,
        required: true,
        trim: true
    },
},{timestamps: true})

const Product = mongoose.model('Product', productSchema, 'products')
export default Product 