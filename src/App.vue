<template>
  <div id="app">
    <IncidentList socket=[socket]></IncidentList>
  </div>
</template>

<script>
/*eslint-disable */
import io from 'socket.io-client'
import IncidentList from './components/IncidentList'

var socket = io.connect('http://localhost:9000')

export default {
  name: 'app',
  components: {
    IncidentList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
