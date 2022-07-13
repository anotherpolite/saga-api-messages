var express = require('express')
var app = express()               

var port = process.env.PORT || 8080

app.post('/mensaje', function(req, res) {
  res.json({ mensaje: 'Método post' })   
})

// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)