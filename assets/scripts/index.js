'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const boardEvents = require('./board/events.js')
const introEvents = require('./intro/events.js')

// Each individual board div has a click event attached upon load.
$(() => {
  setAPIOrigin(location, config)
  boardEvents.addBoardHandlers()
  introEvents.addIntroHandlers()
  $('#game-board').hide()
  $('#sign-in').hide()
  $('#sign-up').hide()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
