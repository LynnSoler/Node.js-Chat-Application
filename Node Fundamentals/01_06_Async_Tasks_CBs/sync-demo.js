fs = require('fs'); //load file system

data = fs.readdirSync('c:/');//read dir from drive C
console.log('data:', data); //log displays dir list

console.log("this comes after");//printed txt to cons