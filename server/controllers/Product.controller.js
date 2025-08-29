import cloudinary from "../config/Cloudnary.js";
import { handleError } from "../helpers/handleErr.js";

import {encode} from 'entities'
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

export const addProduct = async (req, res, next)=> {
    try {
        const data = JSON.parse(req.body.data)
        let featuredImage = ''
         if(req.file){
           
             const uploadResult = await cloudinary.uploader
             .upload(
              req.file.path,
              {
                folder:'inventory-products',
                resource_type: 'auto'
              }
             ) .catch((error) => {
                next(handleError(500,error.message))
            });
            featuredImage = uploadResult.secure_url
            }
        const product = new Product({
            auther: data.auther,
            name: data.name,
            slug: data.slug,
            category: data.category,
            stock: data.stock,
            price: data.price,
            featureImage: featuredImage,
            content: encode(data.content)
        })
        await product.save()
        res.status(200).json({
            success: true,
            message: "product added successfully",
         
           
          });
    } catch (error) {
        next(handleError(500,error.message))
    }
}

export const editProduct = async (req, res, next)=> {
    const {productid} = req.params
    try {
        const product = await Product.findById(productid).populate('category', 'name')
        if(!product){
            next(handleError(404,'Data not Found'))
        }
        res.status(200).json({
            product
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}

export const updateproduct = async (req, res, next) => {
  try {
    const { productid } = req.params;

 
    const data = JSON.parse(req.body.data || "{}");

    const product = await Product.findById(productid);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    
    product.name = data.name ?? product.name;
    product.category = data.category ?? product.category;
    product.stock = data.stock ?? product.stock;
    product.price = data.price ?? product.price;
    product.slug= data.slug;
    product.productContent = encode(data.productContent ?? "");

    if (data.categoryId) {
      product.category = data.categoryId;
    }

  
    if (data.category?.name) {
      product.category = {
        ...product.category,
        name: data.category.name,
      };
    }

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "inventory-product",
        resource_type: "auto",
      });
      product.featureImage = uploadResult.secure_url;
    }

    
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const deleteProduct = async (req, res, next)=> {
    try {
           const {productid} = req.params
           await Product.findByIdAndDelete(productid)
           
             res.status(200).json({
                 success: true,
                 message: "Product Deleted successfully",
                
               });
       } catch (error) {
           next(handleError(500,error.message))
       }
}
export const showAllProduct = async (req, res, next)=> {
    try {
               const user = req.user
       const  product = await Product.find().populate('auther', 'name avatar role').populate('category', 'name slug').sort({createdAt: -1}).lean().exec()
           
        res.status(200).json({
            product
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}


export const showAllProductHome = async (req, res, next)=> {
    try {
        const user = req.user
      
        const product = await Product.find().populate('auther', 'name avatar role').populate('category', 'name slug').sort({createdAt: -1}).lean().exec()
       
        res.status(200).json({
            product
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}


export const getProduct = async (req, res, next)=> {
    try {
        const {slug} = req.params
        const product = await Product.findOne({slug}).populate('auther', 'name avatar role').populate('category', 'name slug').lean().exec()
        res.status(200).json({
            product
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}
export const getRelatedProduct = async (req, res, next)=> {
    try {
        const {category,product} = req.params
        const categoryData = await Category.findOne({slug: category})
        if(!categoryData){
            next(handleError(404,'Category data not found'))
        }
        const categoryId = categoryData._id 
        const relatedProduct = await Product.find({category: categoryId, slug:{ $ne: product}}).lean().exec()
        res.status(200).json({
            relatedProduct
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}

export const getProductByCategory = async (req, res, next)=> {
    try {
        const {category} = req.params
        const categoryData = await Category.findOne({slug: category})
        if(!categoryData){
            next(handleError(404,'Category data not found'))
        }
        const categoryId = categoryData._id 
        const product = await Product.find({category: categoryId}).populate('auther', 'name avatar role').populate('category', 'name slug').sort({createdAt: -1}).lean().exec()
        res.status(200).json({
            product, categoryData
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}


export const search = async (req, res, next)=> {
    try {
        const {q} = req.query 
        console.log(q)
        const product = await Product.find({title: {$regex: q, $options:'i'}}).populate('auther', 'name avatar role').populate('category', 'name slug').sort({createdAt: -1}).lean().exec()
        res.status(200).json({
            product
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}