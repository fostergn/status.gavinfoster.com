// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import io from 'socket.io-client'
import moment from 'moment'

var socket = io.connect('http://status.gavinfoster.com/socket')

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

socket.on('incident', function (data) {
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
