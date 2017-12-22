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
  $('#change-pass').show()
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
  $('#sign-out-button').on('click', signOut)
  $('#change-password-button').on('click', changePasswordRedirect)
  $('#change-password-form').on('submit', changePassword)
  $('#vs-guest-button').on('click', beginGame)
}

module.exports = {
  addProfileHandlers
}
