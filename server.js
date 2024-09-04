const http = require("http");
const productsController = require("./controller/products.controller");
const notfound = require("./controller/notFound.controller");
http
  .createServer((req, res) => {
    const { url, method } = req;
    if (url === "/api/products" && method === "GET")
      productsController.get(res);
    else if (url.match(/\/api\/products\/[0-9]+/) && method === "GET")
      productsController.getById(req, res);
    else if (url === "/api/products" && method === "POST")
      productsController.create(req, res);
    else if (url.match(/\/api\/products\/[0-9]+/) && method === "PUT")
      productsController.update(req, res);
    else if (url.match(/\/api\/products\/[0-9]+/) && method === "DELETE")
      productsController.remove(req, res);
    else notfound(res);
  })
  .listen(3000, () => console.log("server to : http://localhost:3000"));
