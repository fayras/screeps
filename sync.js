const fs = require('fs');
const path = require('path');
const https = require('https');
const credentials = require('./.credentials.js');

let data = {
  branch: 'default',
  modules: {}
};

let files = walkSync('./src');
for(let file of files) {
  let content = fs.readFileSync(file).toString();
  let module = file.replace('src/', '').replace('/', '.').replace('.js', '');
  data.modules[module] = content;
}

let req = https.request({
  hostname: 'screeps.com',
  port: 443,
  path: '/api/user/code',
  method: 'POST',
  auth: credentials.email + ':' + credentials.password,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

req.write(JSON.stringify(data));
req.end();



// List all files in a directory in Node.js recursively in a synchronous fashion
function walkSync(dir, filelist = []) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(file => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    } else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};
