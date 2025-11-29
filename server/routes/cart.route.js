import express from "express";
import { addToCart, clearCartHistory, downloadCartHistoryPDF, getCart, getCartHistory, removeItem, updateQuantity } from "../controllers/Cart.controller.js";
import { authenticate } from "../middleware/authenticate.js";


const CartRoute = express.Router();

CartRoute.post("/add", authenticate ,addToCart);
CartRoute.get("/:userId", authenticate, getCart);
CartRoute.put("/update", updateQuantity);
CartRoute.delete("/remove",  authenticate, removeItem);
CartRoute.get("/history/:userId", getCartHistory);
CartRoute.get("/history/:userId/pdf", downloadCartHistoryPDF);
CartRoute.delete("/history/:userId/clear", authenticate, clearCartHistory   );

export default CartRoute;
