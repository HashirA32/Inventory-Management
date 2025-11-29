import express from "express";

import upload, { uploadExcel } from "../config/multer.js";
import { onlyAdminAuthenticate } from "../middleware/onlyAdminAuthenticate.js";
import { addProduct, deleteProduct, editProduct, getProduct, getProductByCategory, getRelatedProduct, search, showAllProduct, showAllProductHome, updateproduct, uploadProductsExcel } from "../controllers/Product.controller.js";

const ProductRoute = express.Router();
ProductRoute.post("/add", onlyAdminAuthenticate, upload.single('file'), addProduct);
ProductRoute.post("/upload-excel", onlyAdminAuthenticate, uploadExcel.single("file"), uploadProductsExcel);

ProductRoute.get("/edit/:productid", onlyAdminAuthenticate, editProduct);
ProductRoute.put("/update/:productid", onlyAdminAuthenticate, upload.single('file'), updateproduct);
ProductRoute.delete("/delete/:productid", onlyAdminAuthenticate, deleteProduct);
ProductRoute.get("/get-all", showAllProduct);
ProductRoute.get("/get-all-product-home",  showAllProductHome);


ProductRoute.get("/get-product/:slug", getProduct);
ProductRoute.get("/get-related-product/:category/:product", getRelatedProduct);
ProductRoute.get("/get-product-by-category/:category", getProductByCategory);
ProductRoute.get("/search", search);



export default ProductRoute