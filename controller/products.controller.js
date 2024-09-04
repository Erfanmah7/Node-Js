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

async function create(res) {
  try {
    await productsModel.create({
      id: Date.now(),
      name: "erfan",
      description:
        "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
      price: 27,
    });
    res.writeHead(201, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "product created successfully" }));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

const productsController = {
  get,
  getById,
  create,
};

module.exports = productsController;
