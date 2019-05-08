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

mongoose.Promise = Promise //lets mongoose know we want to use default ES6 Prom Lib

var dbUrl = 'mongodb+srv://Michelle:blabla21@learning-node-nsvym.mongodb.net/test?retryWrites=true'

var Message = mongoose.model('Message', { //Mssg = Mssg Model
    name: String,
    message: String
})




// - "var mssgs" after calling MongoDB mssgs w/Message.find({}...)
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



app.post('/messages', async (req, res) => {

    try {
        
        // throw 'some error' //"some error" to CLI
        throw 'error'

        var message = new Message(req.body) //create Model OBJ

        var savedMessage = await message.save()
        
        //- NESTED CB body to REFACTOR CODE..    
            console.log('saved')
        var censored = await Message.findOne({message: 'badword'}) //ret PROMISE in place of CB()
    
        if(censored) 
            await Message.remove({_id: censored.id}) //Mssg PROMISE.. //Message.remove({_id: censored.id}, (err) => { //remove mssg(mongoose creates/manages id anytime OBJ.save to Collection)
        else
            io.emit('message', req.body) //socket.io event = emitted... mssg returns to user/client
            
        res.sendStatus(200)
    } catch (error) { //EXCEPTION HNDLG
        res.sendStatus(500) //#server err code
        return console.error(error) //return err mssg
    } finally { //"finally" exec's whether BLOCK Pass/Fail
        console.log('mssg post called') //"mssg post called" to CLI to test endpt
    }   

})



io.on('connection', (socket) => {
    console.log('a user connected', dbUrl)
})

mongoose.connect(dbUrl, { useNewUrlParser: true}, (err) => { 
    // - "{useMongoClient: true}" = dep err: "The `useMongoClient` option is no longer necessary in mongoose 5.x, please remove it."
    // + { useNewUrlParser: true} = dep err: "current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect."
    console.log('mongo db connection', err) //2nd param "err" if err = true
})

var listen = () => { //express starts & listens for request(port4000)
    console.log('server is listening on port ', port) //ref to port instead of hardcode thru setting "var server" = app.listen
}
//repl "app" w/ "http" to run BOTH Express + Socket.IO now with Node HTTP Server
http.listen(port, listen)