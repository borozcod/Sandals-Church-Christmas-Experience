
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

  const io = socketIO(server);

// var express = require('express');
// var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
//
// });

// app.get('/admin', function(req, res){
//   res.sendFile(__dirname + '/admin.html');
//
// });

var color = "#000";
var campus = '';
var campusData = {};

io.on('connection', function (socket) {

    //Check for the initial connection. If campusData has been changed updated the client
    socket.on('check campus', function (data) {
      var campusCheck  = data.campus;
      if(campusData[`${campusCheck}`]){
         io.sockets.emit(`${campusCheck}`,  campusData[`${campusCheck}`]);
      }
    });

    //When admin changes scene, update the client for spesific campus
    socket.on('change scene', function (data) {
        color = data.color;
        campus = data.campus;
        campusData[`${campus}`] = data;
        io.sockets.emit(`${campus}`,  data);
    });

});

// app.use('/images', express.static(__dirname + "/images"));


// http.listen(8080, function(){
//
// });
