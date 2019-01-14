var http = require("http");

const PORT = process.env.PORT || 5000;

http.createServer(function(request, response) {
  console.log("Server is connected.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("腦大阿囉");
  response.end();
}).listen(PORT);
console.log("Server is created.");



// https://dwatow.github.io/2018/01-13-heroku-node-mvp/
// 參考這個網址部屬heroku