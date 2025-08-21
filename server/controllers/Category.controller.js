import { handleError } from "../helpers/handleErr.js";
import Category from "../models/category.model.js";



export const addCategory = async (req, res, next)=> {
    try {
        const {name, slug} = req.body
        const category = new Category({
            name, slug
        })
        await category.save()
          res.status(200).json({
              success: true,
              message: "Category added",
              
            });
    } catch (error) {
        next(handleError(500,error.message))
    }
}
export const showCategory = async (req, res, next)=> {
    const {categoryid} = req.params
    try {
        const categories = await Category.findById(categoryid)
        if(!categories){
            next(handleError(404,'Data not Found'))
        }
        res.status(200).json({
            categories
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}
export const updateCategory = async (req, res, next)=> {
    try {
        const {name, slug} = req.body
        const {categoryid} = req.params
        const categories = await Category.findByIdAndUpdate(categoryid, {
            name, slug
        },{new: true})

        const category = new Category({
            name, slug
        })
        
          res.status(200).json({
              success: true,
              message: "Category Updated",
              category
            });
    } catch (error) {
        next(handleError(500,error.message))
    }
}
export const deleteCategory = async (req, res, next)=> {
    try {
        const {categoryid} = req.params
        await Category.findByIdAndDelete(categoryid)
        
          res.status(200).json({
              success: true,
              message: "Category Deleted successfully",
             
            });
    } catch (error) {
        next(handleError(500,error.message))
    }
}
export const getAllCategory = async (req, res, next)=> {
    try {
        const categories = await Category.find().sort({name:1}).lean().exec()
        res.status(200).json({
            categories
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}