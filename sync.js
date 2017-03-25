const https = require('https');
const cred = require('./.credentials.js');

const data = {
  branch: 'default',
  modules: {
    src: {
      hello: 'console.log("Hello World!");'
    }
  }
};

let req = https.request({
  hostname: 'screeps.com',
  port: 443,
  path: '/api/user/code',
  method: 'POST',
  auth: cred.email + ':' + cred.password,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

req.write(JSON.stringify(data));
req.end();
