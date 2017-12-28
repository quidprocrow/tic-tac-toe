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
}

const playGameRedirect = function () {
  $('#profile').show()
  $('#game-board').hide()
  $('#change-pass').hide()
  $('#instructions').hide()
  $('#credit').hide()
}

const instructionsRedirect = function () {
  $('#instructions').show()
  $('#game-board').hide()
  $('#change-pass').hide()
  $('#profile').hide()
  $('#credit').hide()
}

const creditRedirect = function () {
  $('#credit').show()
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

// Creates a game, stores the value, and redirects user to the game board.
const quitGame = function () {
  const resetEvent = function () {
    // Resets all those parts of the store file dealing with this game specifically.
    store.game = null
    store.turnCounter = null
    store.currentPlayer = null
    store.currentIndex = null
    // Hides the button itself and the board; shows the profile.
    // Changes navigation.
    $('#reset-game').hide()
    $('#game-board').hide()
    $('#profile').show()
    $('.non-game').css('display', 'inline')
    $('.game-link').css('display', 'none')
    // Clears the board.
    $('#0').html('')
    $('#1').html('')
    $('#2').html('')
    $('#3').html('')
    $('#4').html('')
    $('#5').html('')
    $('#6').html('')
    $('#7').html('')
    $('#8').html('')
    $('#user-msg').html('')
    $('#over-msg').html('')
    $('#even').removeClass('secret')
    $('#even').removeClass('secret')
    $('.othergreeting').html('')
    $('.game-link').hide()
  }
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
}

module.exports = {
  addProfileHandlers
}
