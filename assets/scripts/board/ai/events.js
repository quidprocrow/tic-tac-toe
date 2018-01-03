'use strict'

const store = require('../../store')
const api = require('../api')
const ui = require('./ui')
const guestEvents = require('../events')

// Makes the board array reflect the move made on the HTML board.
// Initiated by the user.
// Uses the usual game update API, then goes to specialized UI success/failure.
const aiSetMove = function (move, index) {
  const arrayUpdate = {
    game: {
      cell: {
        index: index,
        value: move
      },
      over: false
    }
  }
  const cellUpdate = JSON.stringify(arrayUpdate)
  api.updateGame(cellUpdate)
    .then(ui.aiUpdateGameSuccess)
    .catch(ui.aiUpdateGameFailure)
}

// Places the move on the HTML board and the array.
const aiBoardMove = function (boxId) {
  const xHtml = (`<p>X</p>`)
  const boardCell = boxId.substring(1, 2)
  store.currentIndex = boardCell
  // First, check to see if the array has been filled at the same index as the
  // data-cell-index of the div that was clicked. If not, proceed. Otherwise,
  // alert the user.
  if (store.game.cells[boardCell] === '') {
    // Check to see what turn it is.
    // If uneven, it's X's turn.
    if (!(store.turnCounter % 2 === 0)) {
      // Put an 'x' on the board.
      $(boxId).html(xHtml)
      const move = 'x'
      // Mark the current player as X, for display purposes.
      store.currentPlayer = 'X'
      // Put an 'x' in the appropriate spot on the API array.
      aiSetMove(move, boardCell)
    } // win by the player, and alerts accordingly.
  } else {
    // Display error to user that an invalid move has been made.
    // Importantly: does not update turn, nor the board array.
    const invalidMoveHtml = (`<B>Someone beat you to it!</B>`)
    $('#user-msg').html(invalidMoveHtml)
  }
}

// This is the event that runs whenever a user clicks a board cell.
// Logs the space clicked, then checkes that the stored game is not over.
const aiClickEvent = function () {
  // Create a string that can be used for jquery events.
  const boxId = '#' + this.id
  // Check that the game is not over.
  if (store.game.over !== true) {
    // If the game is not over, mark the board accordingly and request a change
    // to the game's API.
    aiBoardMove(boxId)
  } else {
    // If the game is over, inform the user.
    const invalidMoveHtml = (`<B>Game is still over, brah.</B>`)
    $('#ai-over-msg').html(invalidMoveHtml)
  }
}

// Add click events to board.
const addAiBoardHandlers = function () {
  $('#02').on('click', aiClickEvent)
  $('#12').on('click', aiClickEvent)
  $('#22').on('click', aiClickEvent)
  $('#32').on('click', aiClickEvent)
  $('#42').on('click', aiClickEvent)
  $('#52').on('click', aiClickEvent)
  $('#62').on('click', aiClickEvent)
  $('#72').on('click', aiClickEvent)
  $('#82').on('click', aiClickEvent)
  $('#ai-reset-game-button').on('click', guestEvents.resetEvent)
}

module.exports = {
  addAiBoardHandlers
}
