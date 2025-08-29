
import Cart from "../models/cart.model.js";
import { handleError } from "../helpers/handleErr.js";
import Product from "../models/product.model.js";

// Add item to cart



export const addToCart = async (req, res, next) => {
  try {
    const { userId, productId, name, price, image, quantity } = req.body;

    // 1. Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return next(handleError(404, "Product not found"));
    }

    // 2. Check if requested quantity is available
    if (quantity > product.stock) {
      return res
        .status(400)
        .json({ success: false, message: `Only ${product.stock} items available` });
    }

    // 3. Deduct the stock
    product.stock -= quantity;
    await product.save();

    // 4. Create a new cart record (like an order entry)
    const newCart = new Cart({
      userId,
      items: [
        {
          productId,
          name,
          price,
          image,
          quantity,
        },
      ],
    });

    await newCart.save();

    res.status(201).json({
      success: true,
      message: "Added to cart successfully",
      cart: newCart,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Get cart by user
export const getCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    res.status(200).json({ success: true, cart });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Update quantity
export const updateQuantity = async (req, res, next) => {
  try {
    const { userId, productId, type } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    if (type === "inc") item.quantity += 1;
    else if (type === "dec" && item.quantity > 1) item.quantity -= 1;

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Remove item
export const removeItem = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// controllers/stats.controller.js
import Sale from "../models/sale.model.js";

export const getTopProducts = async (req, res, next) => {
  try {
    const topProducts = await Sale.aggregate([
      {
        $group: {
          _id: "$productId",
          totalSold: { $sum: "$quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 3 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          name: "$product.name",
          totalSold: 1,
        },
      },
    ]);

    res.json(topProducts);
  } catch (err) {
    next(err);
  }
};

export const getTopProductsWeekly = async (req, res, next) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const topProductsWeekly = await Cart.aggregate([
   
      { $match: { createdAt: { $gte: oneWeekAgo } } },

    
      { $unwind: "$items" },

      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.quantity" },
        },
      },

      { $sort: { totalSold: -1 } },

      { $limit: 4 },

  
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },

      // Project required fields
      {
        $project: {
          _id: 0,
          productId: "$_id",
          name: "$product.name",
          featureImage: "$product.featureImage",
          totalSold: 1,
        },
      },
    ]);

    res.status(200).json(topProductsWeekly);
  } catch (error) {
    next(handleError(500, error.message));
  }
};