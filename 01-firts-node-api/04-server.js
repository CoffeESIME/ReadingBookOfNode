/* require moduls */
const http=require('http')
const querystring=require('querystring')
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


function respondEcho(req,res){
    const {input=''}=querystring.parse(
        req.url
            .split('?')
            .slice(1)
            .join('')
    )
    res.setHeader('Content-Type','application/json')
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
/*end  of functions to respond a request */ 
/*Server functionality */
const server=http.createServer(function(req,res){
    if(req.url==='/') return respondText(req,res)
    if(req.url==='/json') return respondJson(req,res)
    if(req.url.match(/^\/echo?/)) return respondEcho(req,res)
    respondNotFound(req,res)
})

server.listen(port)
/*end server */


/*mesages to console*/
console.log(`Server listening on port ${port}`)
/* end of mesages to console*/
