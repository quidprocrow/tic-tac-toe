'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const gameApi = require('../board/api.js')

// User is signed out.
const signOut = function (event) {
  event.preventDefault()
  const data = store
  api.signOutUser(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

// User is directed to change password section,
const changePasswordRedirect = function () {
  $('#profile').hide()
  $('#game-board').hide()
  $('#change-pass').show()
  $('#instructions').hide()
  $('#credit').hide()
  $('#personal-statistics').hide()
}

// User is directed to the play section.
const playGameRedirect = function () {
  $('#profile').show()
  $('#game-board').hide()
  $('#change-pass').hide()
  $('#instructions').hide()
  $('#credit').hide()
  $('#personal-statistics').hide()
}

// User is directed to the instructions.
const instructionsRedirect = function () {
  $('#instructions').show()
  $('#game-board').hide()
  $('#change-pass').hide()
  $('#profile').hide()
  $('#credit').hide()
  $('#personal-statistics').hide()
}

// User is directed to the credit.
const creditRedirect = function () {
  $('#credit').show()
  $('#instructions').hide()
  $('#game-board').hide()
  $('#change-pass').hide()
  $('#profile').hide()
  $('#personal-statistics').hide()
}

// User is directed to the stats page.
const statsRedirect = function () {
  $('#personal-statistics').show()
  $('#credit').hide()
  $('#instructions').hide()
  $('#game-board').hide()
  $('#change-pass').hide()
  $('#profile').hide()
}

// Takes the two inputs and creates a passwords objects with old and new keys,
// sends a patch request. If successful, notes this to the user and requests
// they return to their profile; otherwise, notes their failure.
// Resets form inputs upon submit and error data upon redirect.
const changePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePasswordUser(data)
    .then(ui.changePassSuccess)
    .catch(ui.changePassFailure)
  $('#change-password-form').find('input[type=password], textarea').val('')
}

// Creates a game, stores the value, and redirects user to the game board.
const beginGame = function () {
  gameApi.createGame()
    .then(ui.beginGameSuccess)
    .catch(ui.beginGameFailure)
}

// Add click events.
const addProfileHandlers = function () {
  $('#sign-out-link').on('click', signOut)
  $('#play-game-link').on('click', playGameRedirect)
  $('#instructions-link').on('click', instructionsRedirect)
  $('#credit-link').on('click', creditRedirect)
  $('#change-password-link').on('click', changePasswordRedirect)
  $('#change-password-form').on('submit', changePassword)
  $('#vs-guest-button').on('click', beginGame)
  $('#stats-link').on('click', statsRedirect)
}

module.exports = {
  addProfileHandlers
}
