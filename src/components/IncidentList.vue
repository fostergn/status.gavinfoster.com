<template>
  <div class="incident__list">
    <h3>Incidents</h3>
    <ul>
      <li v-for="incident in incidents">
        title: {{incident.title}}<br/>
        message: {{incident.message}}<br/>
        time: {{incident.time}}<br/>
      </li>
    </ul>
  </div>
</template>

<script>
import io from 'socket.io-client'

const incidentList = {
  name: 'incidentList',
  data () {
    return {
      incidents: [
        {
          title: 'Library',
          message: 'At the library again',
          time: 2342342423,
          code: 3
        }
      ]
    }
  }
}

var socket = io.connect('http://localhost:9000')

socket.on('incident', function (data) {
  console.log(data)
  var { title, message, time, code } = data
  incidentList.incidents.unshift({
    title,
    message,
    time,
    code
  })
})

export default incidentList

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
