// import fs from 'node:fs';
import http from 'node:http';
// import https from 'node:https';
import httpProxy from 'http-proxy';


const options = {
  target: 'http://158.160.122.132:8000/api/',
  proxyPort: 5566,
};


const proxy = httpProxy.createProxyServer({});

// const https_options = {
//   key: fs.readFileSync(`${__dirname}/key.pem`),
//   cert: fs.readFileSync(`${__dirname}/cert.pem`),
// };

const ignoreAccessControlHeaders = (header) =>
  !header.toLowerCase().startsWith('access-control-');

// Received a response from the target
proxy.on('proxyRes', (proxyRes, req, res) => {
  proxyRes.headers = Object.keys(proxyRes.headers)
    .filter(ignoreAccessControlHeaders)
    // Create an object with all the relevant headers
    .reduce(
      (all, header) => ({ ...all, [header]: proxyRes.headers[header] }),
      {}
    );

  // Override the response Access-Control-X headers
  if (req.headers['access-control-request-method']) {
    // Allowing all methods being sent - POST/GET, etc...
    res.setHeader(
      'access-control-allow-methods',
      req.headers['access-control-request-method']
    );
  }

  // For preflight requests
  if (req.headers['access-control-request-headers']) {
    res.setHeader(
      'access-control-allow-headers',
      req.headers['access-control-request-headers']
    );
  }

  if (req.headers.origin) {
    // Allowing our localhost origin
    res.setHeader('access-control-allow-origin', req.headers.origin);
    // Allowing CORS to pass cookies
    res.setHeader('access-control-allow-credentials', 'true');
  }

  if (proxyRes.headers['set-cookie']) {
    proxyRes.headers["set-cookie"] = proxyRes.headers["set-cookie"].map(cookie => {
      // Disabling SameSite Strict
      // cookie = cookie.replaceAll("SameSite=Strict", "SameSite=Lax");

      // Disabling any Domain being set
      // cookie = cookie.replaceAll("Domain=ireadyoulearn.info;", "");

      // Changing the cookies path
      cookie = cookie.replaceAll("Path=/api/v1/auth", "Path=/");

      return cookie;
    })
  }

  console.log(req.url);
});

// Failed to send a request to the target
proxy.on('error', (error, req, res) => {
  res.writeHead(500, {
    'Content-Type': 'text/plain',
  });
  res.end(`Proxy Error: ${error}`);
});

// HTTP
const server = http.createServer(function (req, res) {
  // Passing any request that reaches my server to the proxy
  proxy.web(req, res, {
    target: options.target,
    secure: true, // Verify the SSL Certs
    changeOrigin: true, // Set origin of the host header to the target URL
  });
});

// HTTPS
// const server = https.createServer(https_options, (req, res) => {
//   proxy.web(req, res, {
//     target: options.target,
//     secure: true, // Verify the SSL Certs
//     changeOrigin: true, // Set origin of the host header to the target URL
//   });
// });

console.log('listening on port', options.proxyPort);
console.log('target - ', options.target);
server.listen(options.proxyPort);
