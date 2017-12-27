'use strict'

const store = require('../store.js')
const api = require('./api.js')
const ui = require('./ui.js')

// TurnCounter used to check for whose move it is (based on even- or uneven-ness)
// In future work, I would want to make this as a result of a function that checks
// whether or not the game is reloaded, and if so, would identify the turn
// by assuming X is the first move and then identifying whose turn it is
// by whether or not there are more x's than o's on the board.

// Grabs the 'cell index' information from the div's html to return it.
const getData = function (box) {
  return $(box).data('cell-index')
}

// Makes the board array reflect the move made on the HTML board.
const setMove = function (move, index) {
  // console.log('I am the store before the update', store.game.cells)
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
  // cellUpdate = "'" + cellUpdate + "'"
  // console.log('I am the json string during the update', cellUpdate)
  // console.log('I am the store during the update', store)
  api.updateGame(cellUpdate)
    .then(ui.updateGameSuccess)
    .catch(ui.updateGameFailure)
  // console.log('And now I am the store', store.game.cells)
}

// // Clear any errors from the page's display.
// const msgClear = function () {
//   $('#user-msg').html('')
// }

// Places the move on the HTML board and the array.
const boardMove = function (boxId) {
  const xHtml = (`<p>X</p>`)
  const oHtml = (`<p>O</p>`)
  const boardCell = getData(boxId)
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
      setMove(move, boardCell)
    } else {
      // If the number of turns is even...
      // Put an 'o' on the board.
      $(boxId).html(oHtml)
      const move = 'o'
      // Mark the current player as X, for display purposes.
      store.currentPlayer = 'O'
      // Put an 'o' in the appropriate spot on the array.
      setMove(move, boardCell)
      // This initiates a post request, which, if successful, checks for a
      // win by the player, and alerts accordingly.
    }
  } else {
    // Display error to user that an invalid move has been made.
    // Importantly: does not update turn, nor the board array.
    const invalidMoveHtml = (`<B>Someone beat you to it!</B>`)
    $('#user-msg').html(invalidMoveHtml)
  }
}

// This is the event that runs whenever a user clicks a board cell.
// Logs the space clicked, then checkes that the stored game is not over.
const clickEvent = function () {
  // Create a string that can be used for jquery events.
  const boxId = '#' + this.id
  // Check that the game is not over, and inform the user if so.
  if (store.game.over !== true) {
    boardMove(boxId)
  } else {
    const invalidMoveHtml = (`<B>Game is still over, brah.</B>`)
    $('#over-msg').html(invalidMoveHtml)
  }
}

// Add click events to board.
const addBoardHandlers = function () {
  $('#0').on('click', clickEvent)
  $('#1').on('click', clickEvent)
  $('#2').on('click', clickEvent)
  $('#3').on('click', clickEvent)
  $('#4').on('click', clickEvent)
  $('#5').on('click', clickEvent)
  $('#6').on('click', clickEvent)
  $('#7').on('click', clickEvent)
  $('#8').on('click', clickEvent)
}

module.exports = {
  clickEvent,
  addBoardHandlers
}
