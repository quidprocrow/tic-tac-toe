'use strict'

// const store = require('../store')

// Checks to see if the move won the game.
const winEvent = function (boardArray) {
  const players = ['x', 'o']
  let win = false
  // Loops checks first to see if X has a winning combination of moves;
  // then o.
  for (let i = 0; i < players.length; i++) {
    // console.log('I am the board at', i, boardArray[i])
    // console.log('I am the players at i', players[i])
    // console.log('I am the store game cells at i', store.game.cells[i])
    // Horizontal win: first row.
    if (boardArray[0] === players[i] &&
      boardArray[1] === players[i] &&
      boardArray[2] === players[i]) {
      win = true
    }
    // Horizontal win: second row.
    if (boardArray[3] === players[i] &&
      boardArray[4] === players[i] &&
      boardArray[5] === players[i]) {
      win = true
    }
    // Horizontal win: third row.
    if (boardArray[6] === players[i] &&
      boardArray[7] === players[i] &&
      boardArray[8] === players[i]) {
      win = true
    }
    // Vertical win: first column.
    if (boardArray[0] === players[i] &&
      boardArray[3] === players[i] &&
      boardArray[6] === players[i]) {
      win = true
    }
    // Vertical win: second column.
    if (boardArray[1] === players[i] &&
      boardArray[4] === players[i] &&
      boardArray[7] === players[i]) {
      win = true
    }
    // Vertical win: third column.
    if (boardArray[2] === players[i] &&
      boardArray[5] === players[i] &&
      boardArray[8] === players[i]) {
      win = true
    }
    // Diagonal win: left to right.
    if (boardArray[0] === players[i] &&
      boardArray[4] === players[i] &&
      boardArray[8] === players[i]) {
      win = true
    }
    // Diagonal win: right to left;
    if (boardArray[2] === players[i] &&
      boardArray[4] === players[i] &&
      boardArray[6] === players[i]) {
      win = true
    }
    // Win is fale, unless one of the other conditions obtain.
  }
  return win
}

module.exports = {
  winEvent
}
