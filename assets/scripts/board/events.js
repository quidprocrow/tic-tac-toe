'use strict'

const win = require('./win.js')
const store = require('../store.js')
const api = require('./api.js')
const ui = require('./ui.js')

// TurnCounter used to check for whose move it is (based on even- or uneven-ness)
// In future work, I would want to make this as a result of a function that checks
// whether or not the game is reloaded, and if so, would identify the turn
// by assuming X is the first move and then identifying whose turn it is
// by whether or not there are more x's than o's on the board.

let turnCounter = 1

// Grabs the 'cell index' information from the div's html to return it.
const getData = function (box) {
  return $(box).data('cell-index')
}

// Makes the board array reflect the move made on the HTML board.
const setMove = function (move, index) {
  console.log('I am the store before the update', store.game.cells)
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

// Makes the board array reflect the move made on the HTML board.
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
    .then(ui.updateGameSuccess)
    .catch(ui.updateGameFailure)
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
  // console.log('I am board cell', boardCell)
  // console.log('I am store.game.cells', store.game.cells)
  // console.log('I am store game cells', store.game.cells)
  // console.log('I am store.game.cells at the index' + store.game.cells[boardCell])
  // First, check to see if the array has been filled at the same index as the
  // data-cell-index of the div that was clicked. If not, proceed. Otherwise,
  // alert the user.
  if (store.game.cells[boardCell] === '') {
    // console.log('board cell is', boardCell)
    //
    // Check to see what turn it is.
    // If uneven, it's X's turn.
    if (!(turnCounter % 2 === 0)) {
      // Put an 'x' on the board.
      $(boxId).html(xHtml)
      const move = 'x'
      // console.log(move)
      // Put an 'x' in the appropriate spot on the array.
      setMove(move, boardCell)
      // Check to see if the player won.
      // if (win.winEvent(store.game.cells) === true) {
      //   markGameOver(move, boardCell)
      //   const winHtml = (`<B>X won!</B>`)
      //   $('#user-msg').html(winHtml)
      // } else {
      //   // Clear any errors from the display.
      //   msgClear()
      //   // Increase the turn.
      //   turnCounter++
      // }
    } else {
      // If the number of turns is even...
      // Put an 'o' on the board.
      $(boxId).html(oHtml)
      const move = 'o'
      // console.log(move)
      // Put an 'o' in the appropriate spot on the array.
      setMove(move, boardCell)
      // console.log('o')
      // Check to see if the player won.
      if (win.winEvent(store.game.cells) === true) {
        markGameOver(move, boardCell)
        const winHtml = (`<B>O won!</B>`)
        $('#user-msg').html(winHtml)
      } else {
        // Clear any errors from the display.
        // msgClear()
        // Increase the turn.
        turnCounter++
      }
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
  // console.log('I am this id', this.id)
  // console.log('I am the store', store)
  // console.log('Clicked', this.id)
  const boxId = '#' + this.id
  // console.log('It is the', turnCounter, 'round.')
  console.log('I am boxId', boxId)
  if (store.game.over !== 'true') {
    boardMove(boxId)
  } else {
    const invalidMoveHtml = (`<B>Games over, brah.</B>`)
    $('#user-msg').html(invalidMoveHtml)
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
