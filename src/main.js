// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import io from 'socket.io-client'
import moment from 'moment'

var socket = io.connect('http://socket.gavinfoster.com')

// initialize vue
var incidentList = new Vue({
  el: '#incident__list',
  data: {
    incidents: []
  },
  methods: {
    removeIncident (index) {
      this.incidents.splice(index, 1)
    }
  }
})

console.log('socket attempting to connect to : ', socket)

socket.on('connect', function (data) {
  console.log('connected to socket: ', socket)
})

socket.on('connection', function (data) {
  console.log('connected to socket: ', socket)
})

socket.on('incident', function (data) {
  console.log('incident coming in')
  const { title, message, time, code, dispatchTime } = data
  console.log('data: ', data)
  incidentList.incidents.unshift({
    title,
    message,
    time,
    code,
    dispatchYear: moment(dispatchTime * 1).format('D/M/YY'),
    dispatchTime: moment(dispatchTime * 1).format('h:mm A')
  })
})
