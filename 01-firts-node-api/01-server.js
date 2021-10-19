const http=require('http')
const port=process.env.port || 1337
const server=http.createServer(function(req,res){
    res.end('Hi')
})
server.listen(port)
console.log(`Server listening on port ${port}`)