const http = require("http");
const fs = require("fs");
const port = 4005;

const getData = (req) =>
  new Promise((accept) => {
    let data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req.on("end", () => {
      accept(JSON.parse(data));
    });
  });

http
  .createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    const toDo = JSON.parse(fs.readFileSync("data.json"));
    switch (req.method) {
      case "GET":
        res.end(JSON.stringify(toDo));
        return;
      case "PUT":
        toDo[req.url.split("/")[req.url.split("/").length - 1]] = await getData(
          req
        );
        break;
      case "POST":
        toDo.push(await getData(req));
        break;
      case "DELETE":
        toDo.splice(req.url.split("/")[req.url.split("/").length - 1], 1);
        break;
      default:
        break;
    }
    fs.writeFileSync("data.json", JSON.stringify(toDo, null, 2));
    res.end(JSON.stringify(toDo));
  })
  .listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
