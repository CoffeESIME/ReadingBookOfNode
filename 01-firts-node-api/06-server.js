/* require moduls */

const fs=require('fs')
const express=require('express')
/*end of require moduls */

/*Global objects */
const port=process.env.port || 1337
const app=express()
/* end Global objects */


/*functions to respond a request */ 
function respondText(req,res){
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hi')
}
/*As we know we use this function to send Json, but with express we can simplify it 
function respondJson(req,res){
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({text:"Hi",number:[1,2,3]}))
}
with the next function we can replace fot this new function, note that we dont have http module anymore
*/

function respondJson(req,res){
    res.json({text:'hi',numbers:[1,2,3]})
    /*as we can see we don´t need to specify the head because we are using express, and 
    express has roots on http so, express inherit the functionallity of http */
}

function respondNotFound(req,res){
    res.writeHead(404,{'Content-Type':'text/plain'})
    res.end('Not Found / No se encontró')
}

/*function to respond to request to API, for example
this time as we use express we don't have to worry about search query parameters when we defining our rutes
for us an object  {input: 'hi'} these parameters can ve accessed via req.query, the updated version is the following */
function respondEcho(req,res){
    /*This means create a new variable input, and set it to the value of the input property 
    of the return value of req.query, or '' if the return value was undefined. 

    */
    const {input=''}=req.query
    res.setHeader('Content-Type','application/json')
    console.log('we send data')

    /*console.log(input)*/
    /*Part use to generated a JSON data that we'll send to the browser
    here we're using the variable input declared before */
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
    /*here we use the filename compound of the dirname, directory, and the request url
 because expres uses path-to-regex to conver string into regular expresion, after using the 
 static/* everything that will match anything after the static/ will be available for us in the 
 req.params[0] */
    const filename=`${__dirname}/public/${req.params[0]}`
    fs.createReadStream(filename)
        .on('error',()=>respondNotFound(req,res))
        .pipe(res)

    /*console.log(filename)*/
}
/*end  of functions to respond a request */ 
/*Server functionality */
app.get('/', respondText)
app.get('/json', respondJson)
app.get('/echo',respondEcho)
app.get('/static/*',respondStatic)
/*send a message to console */
app.listen(port,()=>console.log(`Server listening on port ${port}`))
/*end server */


/*mesages to console*/

/* end of mesages to console*/
