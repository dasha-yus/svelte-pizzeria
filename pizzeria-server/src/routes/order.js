const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const isAuth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin.js");

// Get all orders
router.get("/", isAdmin, (req, res) => {
  Order.find(req.query.pizzaId ? { pizzaId: req.query.pizzaId } : {})
    .then((orders) => res.json(orders))
    .catch((err) => res.status(500).json(err));
});

// Get orders for specific user
router.get("/user", isAuth, (req, res) => {
  Order.find({ userId: req.user })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(500).json(err));
});

// Add order
router.post("/", isAuth, async (req, res) => {
  try {
    const existingOrder = await Order.findOne({
      pizzaId: req.body.pizzaId,
      userId: req.body.userId,
      size: req.body.size,
    });
    if (existingOrder) {
      existingOrder.quantity += req.body.quantity;
      await existingOrder.save();
      res.json(existingOrder);
    } else {
      const newOrder = await Order.create(req.body);
      res.json(newOrder);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete order
router.delete("/:id", isAuth, (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then((order) => res.json(order))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
