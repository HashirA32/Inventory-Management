
import Cart from "../models/cart.model.js";
import { handleError } from "../helpers/handleErr.js";
import Product from "../models/product.model.js";
import Sale from "../models/sale.model.js";
import PDFDocument from "pdfkit";
// Add item to cart
export const addToCart = async (req, res, next) => {
  try {
    const { userId, productId, name, price, image, quantity } = req.body;

  
    const product = await Product.findById(productId);
    if (!product) {
      return next(handleError(404, "Product not found"));
    }

    if (quantity > product.stock) {
      return res
        .status(400)
        .json({ success: false, message: `Only ${product.stock} items available` });
    }

    
    product.stock -= quantity;
    await product.save();

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

// Cart History

export const getCartHistory = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const history = await Cart.find({ userId })
      .populate({
        path: "items.productId",
        select: "name featureImage price content stock", 
      })
      .sort({ createdAt: -1 });

    if (!history || history.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No history found" });
    }

    res.status(200).json({ success: true, history });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Cart history Download

export const downloadCartHistoryPDF = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const history = await Cart.find({ userId })
      .populate("items.productId", "name featureImage price")
      .sort({ createdAt: -1 });

    if (!history || history.length === 0) {
      return res.status(404).json({ success: false, message: "No history found" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Disposition", "attachment; filename=cart-history.pdf");
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

   
    doc.fontSize(22).font("Helvetica-Bold").text("Purchase History Invoice", {
      align: "center",
    });
    doc.moveDown(2);

   
    doc.fontSize(12).font("Helvetica-Bold");
    const startY = doc.y;
    doc.text("Product", 50, startY, { width: 200 });
    doc.text("Qty", 250, startY, { width: 50, align: "center" });
    doc.text("Price", 320, startY, { width: 100, align: "right" });
    doc.text("Total", 450, startY, { width: 100, align: "right" });

    doc.moveTo(50, startY + 15).lineTo(550, startY + 15).stroke(); 

  
    doc.font("Helvetica").fontSize(11);
    let grandTotal = 0;
    let y = startY + 25;

    history.forEach((cart) => {
      cart.items.forEach((item) => {
        const total = item.price * item.quantity;
        grandTotal += total;

        doc.text(item.productId?.name || item.name, 50, y, { width: 200 });
        doc.text(item.quantity.toString(), 250, y, { width: 50, align: "center" });
        doc.text(`Rs. ${item.price}`, 320, y, { width: 100, align: "right" });
        doc.text(`Rs. ${total}`, 450, y, { width: 100, align: "right" });

        y += 20;
        if (y > 700) {
          doc.addPage();
          y = 50;
        }
      });
    });

    
    doc.moveTo(50, y + 10).lineTo(550, y + 10).stroke();
    doc.fontSize(14).font("Helvetica-Bold").text(`Grand Total: Rs. ${grandTotal}`, 50, y + 20, {
      align: "right",
    });

    doc.end();
  } catch (error) {
    next(handleError(500, error.message));
  }
};