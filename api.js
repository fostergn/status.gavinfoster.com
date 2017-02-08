var app         = require('express')();
var server      = require('http').createServer(app);
var io          = require('socket.io')(server);
var bodyParser  = require('body-parser');
var kue         = require('kue');
var statusQueue = kue.createQueue();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


app.post('/incident', function(req, res){
  console.log('request body: ', req.body);
  var { title, message, delay } = req.body

  // create job
  var job = statusQueue.create('incident', {
      title,
      message,
      time: delay,
  }).delay(delay).priority('normal').attempts(2).save(function(err){
    if(!err) console.log(job.id);
    console.log('job: ', job.data);
  });

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ message: 'successful incident post' }));
});

statusQueue.process('incident', function(job, done){
  sendIncident(job.data, done);
});

server.listen(9000);

function sendIncident(data, done) {
  // return error
  // return done(new Error('invalid to address'));
  let { title, time } = data;
  // log stuff...
  console.log('title: ', title);
  console.log('time: ', time);

  io.sockets.emit('incident', data);
  
  done();
}