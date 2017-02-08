var kue     = require('kue'),
    statusQueue   = kue.createQueue();

var job = statusQueue.create('incident', {
    title: 'My lonely heart calls',
    time: '10203002'
}).delay(60000).priority('normal').attempts(2).save(function(err){
  if(!err) console.log(job.id);
  console.log('job: ', job.data);
});

job.on('complete', function(){
  console.log('job complete');
})

statusQueue.process('incident', function(job, done){
  sendIncident(job.data, done);
});

function sendIncident(data, done) {
  // return error
  // return done(new Error('invalid to address'));
  let { title, time } = data;
  // log stuff...
  console.log('title: ', title);
  console.log('time: ', time);
  
  done();
}