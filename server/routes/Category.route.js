
import express from 'express'
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from '../controllers/Category.controller.js'
import { onlyAdminAuthenticate } from '../middleware/onlyAdminAuthenticate.js'

const CategoryRoute = express.Router()
CategoryRoute.post('/add', onlyAdminAuthenticate, addCategory)
CategoryRoute.put('/update/:categoryid', onlyAdminAuthenticate, updateCategory)
CategoryRoute.get('/show/:categoryid', onlyAdminAuthenticate, showCategory)
CategoryRoute.delete('/delete/:categoryid', onlyAdminAuthenticate,deleteCategory)
CategoryRoute.get('/all-categories', getAllCategory)


export default CategoryRoute