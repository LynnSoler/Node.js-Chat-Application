//getting code from my-module.js accessible in this file for *CODE REUSE*

var myModule = require('./my-module.js') //path to bring in myModule

console.log(myModule.myText) //test same value from module vs value from .myText