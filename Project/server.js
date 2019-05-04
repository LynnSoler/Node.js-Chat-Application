var express = require('express') //call express
var app = express() //set reference to var "app" from instance "express()"

app.use(express.static(__dirname)) //index.html static file(entire__dir) gets served thru "app.use" ...no file gets hosted without this... (=404 not found)

var messages = [
    { name: 'Cory', message: 'Hola' },
    { name: 'Michelle', message: 'Como Estas?'}
]

app.get('/messages', (req, res) =>{ //get request(route, (intake req, output ref for response) => CB to handle)
    //res.send('hello') //response = test string "hello"
    res.send(messages) //resp = "var messages" list above
})

var server = app.listen(3000, () => { //express starts & listens for request(port3000)
    console.log('server is listening on port ', server.address().port) //ref to port instead of hardcode thru setting "var server" = app.listen
})