/* require moduls */

const fs=require('fs')
const express=require('express')
const EventEmitter=require('events')
/*end of require moduls */

/*Global objects */
const chatEmitter=new EventEmitter()
const port=process.env.port || 1337
const app=express()
/* end Global objects */

/*Server functionality */
app.get('/', respondText)
app.get('/json', respondJson)
app.get('/echo',respondEcho)
app.get('/static/*',respondStatic)
app.get('/chat',respondchat)
app.get('/sse',respondSSE)
/*send a message to console */
app.listen(port,()=>console.log(`Server listening on port ${port}`))
/*end server */

/*functions to respond a request */ 
function respondText(req,res){
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hi')
}


function respondJson(req,res){
    res.json({text:'hi',numbers:[1,2,3]})
}

function respondNotFound(req,res){
    res.writeHead(404,{'Content-Type':'text/plain'})
    res.end('Not Found / No se encontró')
}

function respondEcho(req,res){
    const {input=''}=req.query
    res.setHeader('Content-Type','application/json')
    console.log('we send data')
    res.json({
        normal:input,
        shouty:input.toUpperCase(),
        characterCount:input.lenght,
        backwards: input
            .split('')
            .reverse()
            .join('')
    })
}
/*End of fucntion echo */
function respondStatic(req,res){

    const filename=`${__dirname}/public/${req.params[0]}`
    fs.createReadStream(filename)
        .on('error',()=>respondNotFound(req,res))
        .pipe(res)

   
}
function respondchat(req,res){
    const {message}=req.query
    chatEmitter.emit('message',message)
    res.end()
}

function respondSSE(req,res){
    /*we stablish the connection by sending a 200 OK code for HTTP headers
    according to the SSE specification */
    res.writeHead(200,{
        'Content-Type':'text/event-stream',
        'Connection':'keep-alive'
    })
    /*Here we listen for a message from the chat emitter object in this case we use a res.write 
    because we want to use this connection open */
    const onMessage=msg=>res.write(`data:${msg}\n\n`)
    /*here we listen for the connection to close and when is close. This prevents us from
    writing messages to a closed connection */
    chatEmitter.on('message',onMessage)
    res.on('close',function(){

        chatEmitter.off('message',onMessage)
    })
}
/*end  of functions to respond a request */ 



/*mesages to console*/

/* end of mesages to console*/
