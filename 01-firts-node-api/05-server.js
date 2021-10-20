/* require moduls */
const http=require('http')
const querystring=require('querystring')
const fs=require('fs')
/*end of require moduls */

/*Global objects */
const port=process.env.port || 1337
/* end Global objects */


/*functions to respond a request */ 
function respondText(req,res){
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hi')
}

function respondJson(req,res){
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({text:"Hi",number:[1,2,3]}))
}

function respondNotFound(req,res){
    res.writeHead(404,{'Content-Type':'text/plain'})
    res.end('Not Found / No se encontró')
}

/*function to respond to request to API, for example */
function respondEcho(req,res){
    /*This means create a new variable input, and set it to the value of the input property 
    of the return value of querystring.parse(...), or '' if the return value was undefined. 
    Since the property names of the return value of querystring.parse(...) 
    are the query string parameter names, if you don't pass an input parameter, 
    the input variable will be set to ''. 
    As optional
    const parseResult = querystring.parse(...)
    const input = parseResult.input || '';
    */
    const {input=''}=querystring.parse(
        req.url
            .split('?')
            .slice(1)
            .join('')
    )
    res.setHeader('Content-Type','application/json')
    /*console.log(input)*/
    /*Part use to generated a JSON data that we'll send to the browser
    here we're using the variable input declared before */
    res.end(
        JSON.stringify({
            normal:input,
            shouty:input.toUpperCase(),
            characterCount:input.lenght,
            backwards: input
                .split('')
                .reverse()
                .join('')
        })

    )
}
/*End of fucntion echo */
function respondStatic(req,res){
    /*here we use the filename compound of the dirname, directory, and the request url
    because this request is a string we can split it and then use the 2 data returned, 
    that's why we use [1] at the end */
    const filename=`${__dirname}/public${req.url.split('/static')[1]}`
    /*This line opens the file as a readable stram, then use the event on to catch any errors
    that happen while createing the readable stream (usually invalid names) 
    finally we use pipe to send the data to the browser in the res variable 
    pipe=tuberia, but we can choose a definition of "Conducir o canalizar"*/
    fs.createReadStream(filename)
        .on('error',()=>respondNotFound(req,res))
        .pipe(res)

    /*console.log(filename)*/
}
/*end  of functions to respond a request */ 
/*Server functionality */
const server=http.createServer(function(req,res){
    if(req.url==='/') return respondText(req,res)
    if(req.url==='/json') return respondJson(req,res)
    if(req.url.match(/^\/echo?/)) return respondEcho(req,res)
    if(req.url.match(/^\/static/)) return respondStatic(req,res)

    respondNotFound(req,res)
})

server.listen(port)
/*end server */


/*mesages to console*/
console.log(`Server listening on port ${port}`)
/* end of mesages to console*/
