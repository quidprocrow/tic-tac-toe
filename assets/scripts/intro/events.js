'use strict'

// Goes to sign in section, hides the intro.
const introSignIn = function (event) {
  event.preventDefault()
  $('#intro').hide()
  $('#sign-up').hide()
  $('#sign-in').show()
  $('#navigation').show()
  $('#sign-space').show()
  $('.sign-link').show()
}

// Goes to sign up section, hides the intro.
const introSignUp = function (event) {
  event.preventDefault()
  $('#intro').hide()
  $('#sign-in').hide()
  $('#sign-up').show()
  $('#navigation').show()
  $('#sign-space').show()
  $('.sign-link').show()
}

// Add click events for the intro section buttions.
const addIntroHandlers = function () {
  $('#sign-in-button').on('click', introSignIn)
  $('#sign-up-button').on('click', introSignUp)
  $('#sign-in-link').on('click', introSignIn)
  $('#sign-up-link').on('click', introSignUp)
}

module.exports = {
  addIntroHandlers
}
