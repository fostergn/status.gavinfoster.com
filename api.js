var app         = require('express')();
var server      = require('http').createServer(app);
var io          = require('socket.io')(server);
var request     = require('request');
var bodyParser  = require('body-parser');
var kue         = require('kue');
var statusQueue = kue.createQueue({
                    disableSearch: false
                  });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

io.on('connection', function(socket){
  console.log('a user connected');

  // get recent completed kue jobs
  request('http://localhost:3050/jobs/complete/0...9000/desc', (err, res, body) => {
    var incidents = JSON.parse(body);
    if (incidents.length){
      console.log('previous incident last: ', incidents[0].data)
      socket.emit('incident', incidents[0].data);
    }
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

app.get('/socket', function(req, res){
  console.log('someones getting 9000');
  res.send('hey it works');
})


app.post('/incident', function(req, res){
  console.log('request body: ', req.body);
  var { title, message, delay, code, dispatchTime } = req.body

  // create job
  var job = statusQueue.create('incident', {
      title,
      message,
      code,
      dispatchTime,
      time: delay,
  }).delay(delay).priority('normal').attempts(2).save(function(err){
    if(!err) console.log(job.id);
  });

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ message: 'successful incident post' }));
});

statusQueue.process('incident', function(job, done){
  sendIncident(job.data, done);
});

server.listen(8000);

function sendIncident(data, done) {
  console.log('send incident: ', data);
  io.sockets.emit('incident', data);
  done();
}