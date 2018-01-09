'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const gameApi = require('../board/api.js')
const signInApi = require('../sign-in/api.js')

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
  $('#two-player').hide()
  $('#profile').hide()
  $('#game-board').hide()
  $('#change-pass').show()
  $('#instructions').hide()
  $('#credit').hide()
  $('#personal-statistics').hide()
  $('#show-games').html('')
  $('#profile-error').html('')
}

// User is directed to the play section.
const playGameRedirect = function () {
  $('#two-player').hide()
  $('#profile').show()
  $('#game-board').hide()
  $('#change-pass').hide()
  $('#instructions').hide()
  $('#credit').hide()
  $('#personal-statistics').hide()
  $('#show-games').html('')
  $('#profile-error').html('')
}

// User is directed to the instructions.
const instructionsRedirect = function () {
  $('#two-player').hide()
  $('#instructions').show()
  $('#game-board').hide()
  $('#change-pass').hide()
  $('#profile').hide()
  $('#credit').hide()
  $('#personal-statistics').hide()
  $('#show-games').html('')
  $('#profile-error').html('')
}

// User is directed to the credit.
const creditRedirect = function () {
  $('#two-player').hide()
  $('#credit').show()
  $('#instructions').hide()
  $('#game-board').hide()
  $('#change-pass').hide()
  $('#profile').hide()
  $('#personal-statistics').hide()
  $('#show-games').html('')
  $('#profile-error').html('')
}

// To load stats on redirect to stats page.
const onStatsLoad = function () {
  api.getTotalGames()
    .then(ui.statsLoadSuccess)
    .catch(ui.statsLoadFailure)
}

// When clicked, grabs the total games stored when the stats page loads
// and identifies those that are incomplete.
// For each of those incomplete games, appends a paragraph with its ID and
// the user you played against.
// In future versions, this would be used to ensure players can return to
// incomplete games.
const onIncompleteShow = function (event) {
  event.preventDefault()
  const overTest = (input) => input.over === false
  const incompleteGames = store.gamesStats.filter(overTest)
  for (let i = 0; i < incompleteGames.length; i++) {
    let vsPlayer = ''
    if (incompleteGames[i].player_o === null) {
      vsPlayer = 'Guest'
    } else {
      vsPlayer = incompleteGames[i].player_o
    }
    const gameId = incompleteGames[i].id
    const gameHtml = (`
      <p>
      <B>GAME ID #${gameId}</B>: VERSUS <B>${vsPlayer}</B>
      </p>
      `)
    $('#show-games').append(gameHtml).addClass('uppercase').addClass('board-row').addClass('total').addClass('scooch')
  }
}

// User is directed to the stats page.
const statsRedirect = function () {
  $('#two-player').hide()
  $('#personal-statistics').show()
  $('#credit').hide()
  $('#instructions').hide()
  $('#game-board').hide()
  $('#change-pass').hide()
  $('#profile').hide()
  $('#show-games').html('')
  $('#profile-error').html('')
  onStatsLoad()
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

// Creates a game vs an ai, stores the value, and redirects user to the ai game board.
const beginAiGame = function () {
  gameApi.createGame()
    .then(ui.beginAiGameSuccess)
    .catch(ui.beginAiGameFailure)
}

// Form for users on the same device is shown.
const sameDeviceForm = function () {
  $('#second-player-same').show()
  $('#second-player-form').show()
}

// User is directed to the two player section.
const twoPlayerRedirect = function () {
  $('#two-player').show()
  $('#instructions').hide()
  $('#game-board').hide()
  $('#change-pass').hide()
  $('#profile').hide()
  $('#credit').hide()
  $('#personal-statistics').hide()
  $('#show-games').html('')
  $('#profile-error').html('')
}

const secondPlayerSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  signInApi.signInUser(data)
    .then(ui.secondPlayerSuccess)
    .catch(ui.secondPlayerFailure)
  $('#second-player-form').find('input[type=text], textarea').val('')
  $('#second-player-form').find('input[type=password], textarea').val('')
}

const secondPlayerLocalBegin = function () {
  gameApi.createGame()
    .then(ui.secondPlayerLocalSuccess)
    .catch(ui.secondPlayerLocalFailure)
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
  $('#show-incomplete').on('submit', onIncompleteShow)
  $('#show-incomplete').hide()
  $('#vs-ai-button').on('click', beginAiGame)
  $('#vs-play-button').on('click', twoPlayerRedirect)
  $('#same-device-button').on('click', sameDeviceForm)
  $('#second-player-form').on('submit', secondPlayerSignIn)
  $('#second-player-begin').on('click', secondPlayerLocalBegin)
}

module.exports = {
  addProfileHandlers
}
