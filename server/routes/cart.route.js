import express from "express";
import { addToCart, getCart, removeItem, updateQuantity } from "../controllers/Cart.controller.js";

const CartRoute = express.Router();

CartRoute.post("/add", addToCart);
CartRoute.get("/:userId", getCart);
CartRoute.put("/update", updateQuantity);
CartRoute.delete("/remove", removeItem);

export default CartRoute;
