const productsModel = require("../model/products.model");

async function get(req, res) {
  try {
    const products = await productsModel.find();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(products));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

const productsController = {
  get,
};

module.exports = productsController;
