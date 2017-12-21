'use strict'

// Checks to see if the move won the game.
const winEvent = function (boardArray) {
  const players = ['x', 'o']
  let win = false
  for (let i = 0; i < players.length; i++) {
    if (boardArray[0] === players[i] &&
      boardArray[1] === players[i] &&
      boardArray[2] === players[i]) {
      win = true
    }
  }
  return win
}

module.exports = {
  winEvent
}
