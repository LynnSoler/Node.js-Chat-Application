var fs = require('fs')
//bring in file sys


var data = {
    name: 'Bob' //JSON  OBJ
}

//JSON.stringify used to call JSON OBJ above, not as a string
fs.writeFile('data.json', JSON.stringify(data), (err) =>{
    console.log('write finished', err)
})