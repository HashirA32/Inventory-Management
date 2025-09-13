
import express from "express";
import { getTopProductsWeekly,  } from "../controllers/Cart.controller.js";


const router = express.Router();

router.get("/top-products-weekly", getTopProductsWeekly);


export default router;
