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

async function create(req, res) {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const product = { id: Date.now(), ...JSON.parse(body) };
      const result = await productsModel.create(product);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.write(JSON.stringify(result));
      res.end();
    });
  } catch (error) {
    console.log(error);
  }
}

async function update(req, res) {
  try {
    let body = "";
    const id = req.url.split("/")[3];
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const parseBody = { ...JSON.parse(body) };
      const product = await productsModel.findById(id);
      if (!product) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "not found any product" }));
        res.end();
      } else {
        const result = await productsModel.update(id, parseBody);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(result));
        res.end();
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const productsController = {
  get,
  getById,
  create,
  update,
};

module.exports = productsController;
