'use strict';

var http = require("http");

const PORT = process.env.PORT || 5000;

http.createServer(function(request, response) {
  console.log("Server is connected.");
  response.write('<head><meta charset="utf-8"/></head>');
  response.write("腦大阿囉");
  response.end();
}).listen(PORT);
console.log("Server is created, port = ." + String(PORT));



// https://dwatow.github.io/2018/01-13-heroku-node-mvp/
// 參考這個網址部屬heroku