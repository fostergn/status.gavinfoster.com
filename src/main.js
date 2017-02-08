// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import io from 'socket.io-client'

var socket = io.connect('http://localhost:9000')

// initialize vue
var incidentList = new Vue({
  el: '#incident__list',
  data: {
    incidents: [
      {
        title: 'Library',
        message: 'At the library',
        code: 3,
        time: '332543334'
      }
    ]
  }
})

socket.on('incident', function (data) {
  const { title, message, time, code } = data
  incidentList.incidents.unshift({
    title,
    message,
    time,
    code
  })
})
