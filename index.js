const fs = require("fs"); // file read
const http = require("http"); // server
const url = require("url");

const replaceTemplate = require("./modules/replaceTemplate");

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

// functions

// for only one api call when app load
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"); // products array data
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
); // reading html overview page
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const dataObj = JSON.parse(data);

// CREATING SERVER
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // routing
  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" }); // inform browser what page is displaying

    const cardsHtml = dataObj
      .map((element) => replaceTemplate(tempCard, element))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARD%}", cardsHtml);
    res.end(output); // display html page

    // product page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API page
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // not found page
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
