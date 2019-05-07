var express = require('express') //call express
var bodyParser = require('body-parser') // Express = no built-in suppt to parse body; terminal: "npm install -s body-parser"
var port = 4000

var app = express() //set reference to var "app" from instance "express()"
var http = require('http').Server(app) //calling http lbry from node
var io = require('socket.io')(http) //term: "npm install -s socket.io"
var mongoose = require('mongoose')

app.use(express.static(__dirname)) //index.html static file(entire__dir) gets served thru "app.use" ...no file gets hosted without this... (=404 not found)
app.use(bodyParser.json()) //lets bodyParser know to expect json to come in with http req.. *resend "post" on Insomnia & confirm mssg in terminal*
app.use(bodyParser.urlencoded({extended: false}))

var dbUrl = 'mongodb+srv://Michelle:<<<<PASSWORD>>>>@learning-node-nsvym.mongodb.net/test?retryWrites=true'
var Message = mongoose.model('Message', { //Mssg = Mssg Model
    name: String,
    message: String
})

//removed var mssgs after calling MongoDB mssgs w/Message.find({}...)
//var messages = [
//    { name: 'Cory', message: 'Hola' }, //2 mssg OBJ
//    { name: 'Michelle', message: 'Como Estas?'}
//]

app.get('/messages', (req, res) =>{ //get request(route, (intake req, output ref for response) => CB to handle)
    //res.send('hello') //response = test string "hello" b4 adding "var mssg" OBJs above
    Message.find({}, (err, messages) => { //MongoDB "{}" = empty OBJ = select * = no reqmts"
        res.send(messages) //resp = "var messages" list above
        //console.log(messages)
    })
})

app.post('/messages', (req, res) => {
    //console.log(req.body) 
    var message = new Message(req.body) //create Model OBJ

    message.save((err) => { //pass in CB in case fails
        if(err)
            sendStatus(500) //server err code
           
        //SUCCESS BLOCK:
        //to no longer use var mssgs array, removed: ((messages.push(req.body) //mssg.push if mssg.save to db...)) 
        io.emit('message', req.body) //socket.io event = emitted...
        res.sendStatus(200)
    })

    
})

//app.get('/delete', (req, res) => {
//    messages.pop();
//    res.send(messages);
//    // res.sendStatus(200)
//    io.emit('message', req.body)
//})

io.on('connection', (socket) => {
    console.log('a user connected', dbUrl)
})

mongoose.connect(dbUrl, (err) => { //removed 2nd par "{useMongoClient: true}"
    //...term: "The `useMongoClient` option is no longer necessary in mongoose 5.x, please remove it."
    console.log('mongo db connection', err) //2nd param "err" if err = true
})

var listen = () => { //express starts & listens for request(port4000)
    console.log('server is listening on port ', port) //ref to port instead of hardcode thru setting "var server" = app.listen
}
//repl "app" w/ "http" to run BOTH Express + Socket.IO now with Node HTTP Server
http.listen(port, listen)