const express = require("express");
const router = express.Router();
const Pizza = require("../models/pizza");
const isAdmin = require("../middleware/isAdmin");

router.get("/pizzas", (req, res) => {
  Pizza.find()
    .then((pizzas) => res.json(pizzas))
    .catch((err) => res.status(500).json(err));
});

router.get("/pizzas/:id", (req, res) => {
  Pizza.findById(req.params.id)
    .then((pizza) => res.json(pizza))
    .catch((err) => res.status(500).json(err));
});

router.delete("/pizzas/:id", isAdmin, (req, res) => {
  Pizza.findByIdAndRemove(req.params.id)
    .then((pizza) => res.json(pizza))
    .catch((err) => res.status(500).json(err));
});

router.post("/pizzas", isAdmin, (req, res) => {
  Pizza.create(req.body)
    .then((pizza) => res.json(pizza))
    .catch((err) => res.status(500).json(err));
});

router.put("/pizzas/:id", isAdmin, (req, res) => {
  Pizza.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.json(data);
      }
    }
  );
});

module.exports = router;
