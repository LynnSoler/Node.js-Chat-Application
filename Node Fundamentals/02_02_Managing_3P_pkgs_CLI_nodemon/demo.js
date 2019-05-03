//pkgs = 1+ modules bundled together
//lodash = popular pkg
// "npm install lodash" = cmd to install lodash


var _ = require('lodash') //brings in lodash (node knows location of lodash, no need to specify location/address)

console.log(_.random(1, 10)) // "node .\demo.js" = cmd to see terminal output of random(1,10)

//nodemon = CLI PACKAGE
// "npm install -g nodemon" = cmd for Global install of nodemon (to access nodemon outside/independent of this project.)
// "nodemon .\demo.js" = cmd to auto-exec demo.js file everytime a change occurs in demo.js (exec's after saving file).
