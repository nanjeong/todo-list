const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "/db.json"));
const port = process.env.PORT || 3000;

server.use(router);
server.listen(port, () => {
    console.log("JSON Server is running");
});
