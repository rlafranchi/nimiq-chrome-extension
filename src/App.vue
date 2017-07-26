<template>
  <div id="app">
    <img src="./assets/logo.png" width="100" height="100">
    <h3>NIMIQ</h3>
    <a href="#!" v-if="hashrate > 0" @click="stop()">Pause Mining</a>
    <a href="#!" v-if="established && hashrate === 0" @click="start()">Resume Mining</a>
    <ul>
      <li>
        Consensus: {{ established ? '' : 'not' }} established
      </li>
      <li>
        Connected To: {{ peers }} Peer{{ peers === 1 ? '' : 's' }}
      </li>
      <li>
        Mining on Block: {{ height }}
      </li>
      <li>
        My Hashrate: {{ hashrate }}
      </li>
      <li>
        Balance: {{ balance }}
      </li>
      <li>
        <a href="https://nimiq.com" target="_blank">https://nimiq.com</a>
      </li>
    </ul>
  </div>
</template>

<script>
import chromePort from './helpers/chromePort'
import { log } from './helpers/logger'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Loading...',
      established: false,
      peers: 0,
      balance: 0,
      hashrate: 0,
      height: 0,
      mining: false
    }
  },
  created () {
    this.waitForMessages()
    this.pollHashrate()
    chromePort.postMessage({type: 'init'})
  },
  methods: {
    pollHashrate () {
      setInterval(() => {
        chromePort.postMessage({type: 'hashrate'})
      }, 1000)
    },
    waitForMessages () {
      let that = this
      chromePort.onMessage.addListener(function (msg) {
        console.log('message received in the popup ' + JSON.stringify(msg))
        switch (msg.type) {
          case 'init':
            that.established = msg.msg.established
            that.peers = msg.msg.peers
            that.balance = msg.msg.balance
            that.hashrate = msg.msg.hashrate
            that.height = msg.msg.height
            that.msg = that.established ? '' : 'Establishing Consensus...'
            break
          case 'height':
            that.height = msg.msg
            break
          case 'peers':
            that.peers = msg.msg
            break
          case 'hashrate':
            that.hashrate = msg.msg
            break
          case 'balance':
            that.balance = msg.msg
            break
          case 'established':
            that.established = true
            that.msg = msg.msg
            break
          case 'lost':
            that.established = false
            that.msg = msg.msg
            break
          default:
            log({error: 'Invalid message'})
            break
        }
      })
    },
    start () {
      chromePort.postMessage({type: 'start'})
    },
    stop () {
      chromePort.postMessage({type: 'stop'})
    }
  }
}
</script>

<style>
body {
  background-color: #042146;
  width: 250px;
}

#app {
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 10px;
}

a {
  color: #e2a62f;
}

h1, h2, h3 {
  font-weight: normal;
  color: #e2a62f;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
</style>
