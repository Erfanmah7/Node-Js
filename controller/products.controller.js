const productsModel = require("../model/products.model");
const notfound = require("./notFound.controller");

async function get(res) {
  try {
    const products = await productsModel.find();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(products));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

async function getById(req, res) {
  try {
    const id = req.url.split("/")[3];
    const product = await productsModel.findById(id);
    if (!product) {
      notfound(res);
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(product));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
}

const productsController = {
  get,
  getById,
};

module.exports = productsController;
