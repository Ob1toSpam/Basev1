const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const HOST = "0.0.0.0";

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  let filePath = "." + req.url;

  if (filePath === "./") {
    filePath = "./index.html";
  }

  const extname = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extname] || "text/plain";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>404 - Arquivo não encontrado</h1>");
      } else {
        res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>500 - Erro interno do servidor</h1>");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType + "; charset=utf-8" });
      res.end(content);
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://127.0.0.1:${PORT}`);
});