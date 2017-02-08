var r = require ('rethinkdb');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


app.post('/incident', function(req, res){
  res.send('POST request to homepage');
});

// var connection = null;
// r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
//     if (err) throw err;
//     connection = conn;

//     // listen to changes
//     r.db('status').table('incidents').changes().run(connection, function(err, cursor){
//       if (err) throw err;
//       cursor.each(function(err, row) {
//         if (err) throw err;
//         console.log(JSON.stringify(row, null, 2));

//         // send to all websocket clients
//         io.sockets.emit('incident', JSON.stringify(row, null, 2));
//       });
//     })
// });

server.listen(9000);