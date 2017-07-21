/* global chrome:true */
let chromePort = null
import { log } from '../helpers/logger'

try {
  chromePort = chrome.extension.connect({
    name: 'nimiq-miner-connect'
  })

  chromePort.onMessage.addListener(function (msg) {
    switch (msg.type) {
      case 'hashRate':
        log('Hash Rate changed...')
        break
      default:
        log('Invalid msg received...')
        break
    }
  })
} catch (e) {
  console.error(e)
}

export default chromePort
