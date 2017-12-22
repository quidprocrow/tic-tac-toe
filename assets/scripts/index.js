'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const boardEvents = require('./board/events.js')
const introEvents = require('./intro/events.js')
const signInEvents = require('./sign-in/events.js')
const signUpEvents = require('./sign-up/events.js')

// FormClear placed in index to make it available to nested forms.
const formClear = function () {
  $('#sign-up-form').find('input[type=text], textarea').val('')
  $('#sign-in-form').find('input[type=text], textarea').val('')
  $('#sign-up-form').find('input[type=password], textarea').val('')
  $('#sign-in-form').find('input[type=password], textarea').val('')
}

// All sections except intro hidden.
// Intro buttons direct accordingly, showing the appropriate form and hiding the intro.
// Each individual board div has a click event attached upon load.
$(() => {
  setAPIOrigin(location, config)
  introEvents.addIntroHandlers()
  signInEvents.addSignInHandlers()
  signUpEvents.addSignUpHandlers()
  boardEvents.addBoardHandlers()
  $('#profile').hide()
  $('#game-board').hide()
  $('#sign-in').hide()
  $('#sign-up').hide()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

module.exports = {
  formClear
}
