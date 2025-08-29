import express from "express";

import upload from "../config/multer.js";
import { authenticate } from "../middleware/authenticate.js";
import { addProduct, deleteProduct, editProduct, getProduct, getProductByCategory, getRelatedProduct, search, showAllProduct, showAllProductHome, updateproduct } from "../controllers/Product.controller.js";

const ProductRoute = express.Router();
ProductRoute.post("/add", authenticate, upload.single('file'), addProduct);
ProductRoute.get("/edit/:productid", authenticate, editProduct);
ProductRoute.put("/update/:productid", authenticate, upload.single('file'), updateproduct);
ProductRoute.delete("/delete/:productid", authenticate, deleteProduct);
ProductRoute.get("/get-all", showAllProduct);
ProductRoute.get("/get-all-product-home",  showAllProductHome);


ProductRoute.get("/get-product/:slug", getProduct);
ProductRoute.get("/get-related-product/:category/:product", getRelatedProduct);
ProductRoute.get("/get-product-by-category/:category", getProductByCategory);
ProductRoute.get("/search", search);



export default ProductRoute