const http = require("http");
const productsController = require("./controller/products.controller");
const notfound = require("./controller/notFound.controller");
http
  .createServer((req, res) => {
    if (req.url === "/api/products") productsController.get(req, res);
    else if (req.url.match(/\/api\/products\/[0-9]+/))
      productsController.get(req, res);
    else notfound(res);
  })
  .listen(3000, () => console.log("server to : http://localhost:3000"));
