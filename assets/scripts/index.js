'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const boardEvents = require('./board/events.js')
const introEvents = require('./intro/events.js')
const signInEvents = require('./sign-in/events.js')
const signUpEvents = require('./sign-up/events.js')
const profileEvents = require('./profile/events.js')

// All sections except intro hidden.
// Intro buttons direct accordingly, showing the appropriate form and hiding the intro.
// Each individual board div has a click event attached upon load.
$(() => {
  setAPIOrigin(location, config)
  introEvents.addIntroHandlers()
  signInEvents.addSignInHandlers()
  signUpEvents.addSignUpHandlers()
  profileEvents.addProfileHandlers()
  boardEvents.addBoardHandlers()
  $('#change-pass').hide()
  $('#profile').hide()
  $('#game-board').hide()
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#navigation').hide()
  $('#instructions').hide()
  $('#credit').hide()
  $('.game-link').hide()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

module.exports = {
}
