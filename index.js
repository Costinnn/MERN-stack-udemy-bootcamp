const fs = require("fs");
const http = require("http");
const url = require("url");

////////////////////////////////////////////// FILES

//Blocking syncrhronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8"); // read
// console.log(textIn);

// const textOut = `This is smth about avocado: ${textIn}.\nCreated on ${Date.now()}`;

// fs.writeFileSync("./txt/output.txt", textOut); // write
// console.log("File written");

// Non-blocking async

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("FILE WRITTEN");
//       });
//     });
//   });
// });
// console.log("after async");

////////////////////////////////////////////// SERVER

// for only one api call when app load
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // routing
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is overview");
  } else if (pathName === "/product") {
    res.end("This is product");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    }); // inform browser about content type
    res.end("<h1>Page not found</h1>"); // write on browser
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
