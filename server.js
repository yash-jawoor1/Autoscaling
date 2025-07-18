const http = require('http');

const server = http.createServer((req, res) => {
  console.log("Request received");
  res.end("Hello from Auto Scaling EC2 instance");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
