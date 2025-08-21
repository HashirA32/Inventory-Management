
import express from 'express'
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from '../controllers/Category.controller.js'
// import { onlyadminauthenticate } from '../middleware/onlyAdminAuthenticate.js'
// import { authenticate } from '../middleware/authenticate.js'


const CategoryRoute = express.Router()
CategoryRoute.post('/add', addCategory)
CategoryRoute.put('/update/:categoryid', updateCategory)
CategoryRoute.get('/show/:categoryid', showCategory)
CategoryRoute.delete('/delete/:categoryid',deleteCategory)
CategoryRoute.get('/all-categories',getAllCategory)


export default CategoryRoute