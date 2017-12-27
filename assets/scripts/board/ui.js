'use strict'
const store = require('../store.js')
const win = require('./win.js')

// Clear any errors from the page's display.
const msgClear = function () {
  $('#user-msg').html('')
}

const updateGameSuccess = function (data) {
  // console.log('I am the store game cells before success', store.game.cells)
  store.game = data.game
  store.turnCounter = store.turnCounter + 1
  // console.log(store.turnCounter)
  if (win.winEvent(store.game.cells) === true) {
    // markGameOver(move, boardCell)
    const winHtml = (`<B>X won!</B>`)
    $('#user-msg').html(winHtml)
  } else {
    // Clear any errors from the display.
    msgClear()
    // Increase the turn.
  }
}

const updateGameFailure = function (data) {
  console.log(data)
  const invalidMoveHtml = (`<B>How bizzare.</B>`)
  $('#user-msg').html(invalidMoveHtml)
}

module.exports = {
  updateGameFailure,
  updateGameSuccess
}
