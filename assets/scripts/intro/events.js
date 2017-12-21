'use strict'

const introSignIn = function (event) {
  event.preventDefault()
  $('#intro').hide()
  $('#sign-in').show()
}

const introSignUp = function (event) {
  event.preventDefault()
  $('#intro').hide()
  $('#sign-up').show()
}

// Add click events for the intro section buttions.
const addIntroHandlers = function () {
  $('#sign-in-button').on('click', introSignIn)
  $('#sign-up-button').on('click', introSignUp)
}

module.exports = {
  addIntroHandlers
}
