new window.EventSource('/sse').onmessage=function(event){
    /*here we select from the doom the id messages */
    window.messages.innerHTML+=`<p>${event.data}</p>`
    console.log(window.messages.innerHTML)
}
window.form.addEventListener('submit',function(evt){
    evt.preventDefault()
    window.fetch(`/chat?message=${window.input.value}`)
    window.input.value=''

})