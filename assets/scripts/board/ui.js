'use strict'
const store = require('../store.js')
const win = require('./win.js')
const api = require('./api.js')

// Clear any errors from the page's display.
const msgClear = function () {
  $('#user-msg').html('')
}

// Makes the API reflect that the game is over.
const markGameOver = function (move, index) {
  const arrayUpdate = {
    game: {
      cell: {
        index: index,
        value: move
      },
      over: true
    }
  }
  const cellUpdate = JSON.stringify(arrayUpdate)
  api.updateGame(cellUpdate)
    .then(endGameSuccess)
    .catch(endGameFailure)
}

const updateGameSuccess = function (data) {
// Make the stored game reflect the updated API game.
  store.game = data.game
  // Prepare variables if game is over.
  const move = store.currentPlayer.toLowerCase()
  const index = store.currentIndex
  // Check if this is a winning move.
  if (win.winEvent(store.game.cells) === true) {
    // If they've won, tell User.
    const winHtml = (`<B>${store.currentPlayer} won!</B>`)
    $('#user-msg').html(winHtml)
    // Mark the game over.
    markGameOver(move, index)
  } else {
    // Clear any errors from the display.
    msgClear()
    // Increase the turn.
    store.turnCounter = store.turnCounter + 1
  }
}

const updateGameFailure = function (data) {
  const invalidMoveHtml = (`<B>How bizzare.</B>`)
  $('#user-msg').html(invalidMoveHtml)
}

const endGameSuccess = function (data) {
// Make the stored game reflect the updated API game.
  store.game = data.game
  console.log('I am the stored game', store.game)
  const endMoveHtml = (`<p><B>Game over.</B></p>`)
  $('#user-msg').append(endMoveHtml)
}

const endGameFailure = function (data) {
  const invalidMoveHtml = (`<B>How bizzare.</B>`)
  $('#user-msg').html(invalidMoveHtml)
}

module.exports = {
  updateGameFailure,
  updateGameSuccess
}
