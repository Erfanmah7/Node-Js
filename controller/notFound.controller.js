function notfound(res) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ message: "route not found" }));
  res.end();
}
module.exports = notfound;
