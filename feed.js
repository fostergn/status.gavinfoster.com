var socket = io.connect('http://localhost:9000');

// initialize vue
var incidentList = new Vue({
  el: '#incident__list',
  data: {
    incidents: [
      { message: 'At the library' },
      { message: 'Went home' }
    ]
  }
})


socket.on('incident', function (data) {
  console.log(data);
  incidentList.incidents.push({
    title: data.title,
    message: data.message,
    time: data.time
  });
});
