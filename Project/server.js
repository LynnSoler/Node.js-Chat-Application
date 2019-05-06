var express = require('express') //call express
var port = 4000
var app = express() //set reference to var "app" from instance "express()"
var listen = () => { //express starts & listens for request(port4000)
    console.log('server is listening on port ', port, "asfdkjghs") //ref to port instead of hardcode thru setting "var server" = app.listen
}
var bodyParser = require('body-parser') // Express = no built-in suppt to parse body; terminal: "npm install -s body-parser"

app.use(express.static(__dirname)) //index.html static file(entire__dir) gets served thru "app.use" ...no file gets hosted without this... (=404 not found)
app.use(bodyParser.json()) //lets bodyParser know to expect json to come in with http req.. *resend "post" on Insomnia & confirm mssg in terminal*

var messages = [
    { name: 'Cory', message: 'Hola' }, //2 mssg OBJ
    { name: 'Michelle', message: 'Como Estas?'}
]

app.get('/messages', (req, res) =>{ //get request(route, (intake req, output ref for response) => CB to handle)
    //res.send('hello') //response = test string "hello" b4 adding "var mssg" OBJs above
    res.send(messages) //resp = "var messages" list above
})

app.post('/messages', (req, res) => {
    console.log(req.body) //*GO to API client (Postman/Insomnia etc) for post req*
    messages.push(req.body)
    res.sendStatus(200)
})

app.listen(port, listen)