/* eslint no-undef: "error" */
import chromePort from './chromePort'

export const log = (message) => {
  try {
    chromePort.postMessage({type: 'bglog', obj: message})
  } catch (e) {
    console.log(message)
  }
}
