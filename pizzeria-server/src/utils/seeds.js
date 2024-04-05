const fs = require("fs");
const path = require("path");
const Pizza = require("../models/pizza");

const filePath = path.join(__dirname, "/../data/pizzas.json");
const fileData = fs.readFileSync(filePath);
const pizzas = JSON.parse(fileData);

const seedDB = () => {
  Pizza.remove({}, (err) => {
    if (err) console.log(err);
    console.log("removed pizzas");
    pizzas.forEach((pizza) => {
      Pizza.create(pizza, (err, pizzas) => {
        if (err) {
          console.log(err);
        } else {
          console.log("added a pizza");
        }
      });
    });
  });
};

module.exports = seedDB;
