const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')
var console = require('tracer').colorConsole();


const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/login', (req, res) => {
  console.log(req.body);
  res.send({
    express: 'haha'
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`));