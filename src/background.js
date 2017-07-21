/* global Nimiq:true */
/* global chrome:true */
/* eslint no-undef: "error" */
// moved

Nimiq.init($ => {
  const connections = []

  const _onInit = (port) => {
    $.accounts.getBalance($.wallet.address)
      .then(balance => {
        port.postMessage({
          type: 'init',
          msg: {
            established: $.consensus.established,
            peers: $.network.peerCount,
            balance: balance.value.toFixed(2),
            hashrate: $.miner.hashrate,
            height: $.blockchain.height
          }
        })
      })
  }

  chrome.extension.onConnect.addListener((port) => {
    const listener = port.onMessage.addListener((message, sender) => {
      console.log('sender ' + JSON.stringify(sender))
      if (sender.id !== chrome.extension.id) {
        console.error('Cant accept messages from unknown sources')
        return
      }
      switch (message.type) {
        case 'init':
          _onInit(port)
          break
        case 'hashrate':
          port.postMessage({type: 'hashrate', msg: $.miner.hashrate})
          break
        case 'start':
          $.miner.startWork()
          break
        case 'stop':
          $.miner.stopWork()
          break
        case 'bglog':
          if (message.obj.error) {
            console.error('ERROR: ' + JSON.stringify(message.obj.error))
          } else {
            console.info('LOG: ' + JSON.stringify(message.obj))
          }
          break
        default:
          console.error('Invalid message type')
      }
    })
    connections.push({ port: port, listener: listener })
  })

  const broadcast = (msg) => {
    let toRemove = []
    connections.forEach(connection => {
      try {
        connection.port.postMessage(msg)
      } catch (e) {
        toRemove.push(connections.indexOf(connection))
        connection.port.onMessage.removeListener(connection.port.listener)
        console.error(e.toString())
      }
    })
    toRemove.forEach(i => connections.splice(i, 1))
  }

  const _onConsensusEstablished = () => {
    $.accounts.getBalance($.wallet.address)
      .then(balance => _onBalanceChanged(balance))
    $.accounts.on($.wallet.address, account => _onBalanceChanged(account.balance))
    $.miner.startWork()
    broadcast({type: 'established', msg: 'Consensus established.'})
  }

  const _onConsensusLost = () => {
    console.error('Consensus lost')
    $.miner.stopWork()
    broadcast({type: 'lost', msg: 'Consensus lost. Miner Stopped'})
  }

  const _onBalanceChanged = (newBalance) => {
    console.log(`New balance of ${$.wallet.address} is ${newBalance}.`)
    broadcast({type: 'balance', msg: newBalance.value.toFixed(2)})
  }

  const _onHeadChanged = () => {
    const height = $.blockchain.height
    broadcast({type: 'height', msg: height})
  }

  const _onPeersChanged = () => {
    console.log(`Now connected to ${$.network.peerCount} peers.`)
    broadcast({type: 'peers', msg: $.network.peerCount})
  }

  window.$ = $
  $.consensus.on('established', () => _onConsensusEstablished())
  $.consensus.on('lost', () => _onConsensusLost())
  $.blockchain.on('head-changed', _ => _onHeadChanged())
  $.network.on('peers-changed', () => _onPeersChanged())

  $.network.connect()
}, (error) => {
  console.error(error)
})
