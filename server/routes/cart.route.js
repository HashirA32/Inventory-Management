import express from "express";
import { addToCart, downloadCartHistoryPDF, getCart, getCartHistory, removeItem, updateQuantity } from "../controllers/Cart.controller.js";
import { authenticate } from "../middleware/authenticate.js";


const CartRoute = express.Router();

CartRoute.post("/add", authenticate ,addToCart);
CartRoute.get("/:userId", authenticate, getCart);
CartRoute.put("/update", updateQuantity);
CartRoute.delete("/remove",  authenticate, removeItem);
CartRoute.get("/history/:userId", getCartHistory);
CartRoute.get("/history/:userId/pdf", downloadCartHistoryPDF);

export default CartRoute;
