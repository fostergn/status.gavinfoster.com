var socket = io.connect('http://localhost:9000');

socket.on('incident', function (data) {
  console.log(data);
});