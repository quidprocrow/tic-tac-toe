'use strict'

const store = require('../../store')
const win = require('../win')
const api = require('../api')

// This function looks at the map, first, considering whether or not it has
// the possibility of a win, then considering whether it is about to lose.
// If neither possibility obtains, the AI then makes a decision based on a weighted
// board: all taken places are marked as 0; all corners are 5; the center is 7;
// and the remaining open places are 2. First it tries to grab the center,
// then a corner, then anything left.
const aiMove = function (boardArray) {
  let aiChoice = null
  const biggerThanFive = (number) => {
    if (number > 5) {
      return true
    } else {
      return false
    }
  }
  const biggerThanThree = (number) => {
    if (number > 3) {
      return true
    } else {
      return false
    }
  }
  const checkEven = function (number) {
    if (number % 2 === 0) {
      return true
    } else {
      return false
    }
  }
  const mapMaker = function (aiArray) {
    for (let i = 0; i < aiArray.length; i++) {
      if (aiArray[i] === '') {
        if (checkEven(i) && i !== 4 && i === 0) {
          aiArray[i] = 5
        } else if (i === 4) {
          aiArray[i] = 7
        } else {
          aiArray[i] = 2
        }
      } else {
        aiArray[i] = 0
      }
    }
  }
  // Beginning of offensive / defensive check.
  const players = ['o', 'x']
  for (let j = 0; j < players.length; j++) {
    if (boardArray[0] === players[j] &&
       boardArray[1] === players[j] &&
       boardArray[2] === '') {
      aiChoice = 2
      return aiChoice
    } else if (boardArray[1] === players[j] &&
          boardArray[2] === players[j] &&
        boardArray[0] === '') {
      aiChoice = 0
    } else if (boardArray[0] === players[j] &&
          boardArray[2] === players[j] &&
        boardArray[1] === '') {
      aiChoice = 1
      return aiChoice
    } else if (boardArray[0] === players[j] &&
          boardArray[2] === players[j] &&
        boardArray[1] === '') {
      aiChoice = 1
      return aiChoice
      // Check for middle row.
    } else if (boardArray[3] === players[j] &&
          boardArray[4] === players[j] &&
        boardArray[5] === '') {
      aiChoice = 5
      return aiChoice
    } else if (boardArray[4] === players[j] &&
          boardArray[5] === players[j] &&
        boardArray[3] === '') {
      aiChoice = 3
      return aiChoice
    } else if (boardArray[3] === players[j] &&
          boardArray[5] === players[j] &&
        boardArray[4] === '') {
      aiChoice = 4
      return aiChoice
      // Check for bottom row.
    } else if (boardArray[6] === players[j] &&
          boardArray[7] === players[j] &&
        boardArray[8] === '') {
      aiChoice = 8
      return aiChoice
    } else if (boardArray[7] === players[j] &&
          boardArray[8] === players[j] &&
        boardArray[6] === '') {
      aiChoice = 6
      return aiChoice
    } else if (boardArray[6] === players[j] &&
          boardArray[8] === players[j] &&
        boardArray[7] === '') {
      aiChoice = 7
      return aiChoice
      // Check for first column.
    } else if (boardArray[0] === players[j] &&
          boardArray[3] === players[j] &&
        boardArray[6] === '') {
      aiChoice = 6
      return aiChoice
    } else if (boardArray[3] === players[j] &&
          boardArray[6] === players[j] &&
        boardArray[0] === '') {
      aiChoice = 0
    } else if (boardArray[0] === players[j] &&
          boardArray[6] === players[j] &&
        boardArray[3] === '') {
      aiChoice = 3
      return aiChoice
      // Check for second column.
    } else if (boardArray[1] === players[j] &&
          boardArray[4] === players[j] &&
        boardArray[7] === '') {
      aiChoice = 7
      return aiChoice
    } else if (boardArray[4] === players[j] &&
          boardArray[7] === players[j] &&
        boardArray[1] === '') {
      aiChoice = 1
      return aiChoice
    } else if (boardArray[1] === players[j] &&
          boardArray[7] === players[j] &&
        boardArray[4] === '') {
      aiChoice = 4
      return aiChoice
      // Check for third row.
    } else if (boardArray[2] === players[j] &&
          boardArray[5] === players[j] &&
        boardArray[8] === '') {
      aiChoice = 8
      return aiChoice
    } else if (boardArray[5] === players[j] &&
          boardArray[8] === players[j] &&
        boardArray[2] === '') {
      aiChoice = 2
      return aiChoice
    } else if (boardArray[2] === players[j] &&
          boardArray[8] === players[j] &&
        boardArray[5] === '') {
      aiChoice = 5
      return aiChoice
      // Check for left diagonal.
    } else if (boardArray[0] === players[j] &&
          boardArray[4] === players[j] &&
        boardArray[8] === '') {
      aiChoice = 8
      return aiChoice
    } else if (boardArray[4] === players[j] &&
          boardArray[8] === players[j] &&
        boardArray[0] === '') {
      aiChoice = 0
      return aiChoice
    } else if (boardArray[0] === players[j] &&
          boardArray[8] === players[j] &&
        boardArray[4] === '') {
      aiChoice = 4
      return aiChoice
      // Check for right diagonal.
    } else if (boardArray[2] === players[j] &&
          boardArray[4] === players[j] &&
        boardArray[6] === '') {
      aiChoice = 6
      return aiChoice
    } else if (boardArray[4] === players[j] &&
          boardArray[6] === players[j] &&
        boardArray[2] === '') {
      aiChoice = 2
      return aiChoice
    } else if (boardArray[2] === players[j] &&
          boardArray[6] === players[j] &&
        boardArray[4] === '') {
      aiChoice = 4
      return aiChoice
    }
  }
  // Without offense or defense, makes a choice weighted with what is left.
  if (aiChoice === null) {
    const aiArray = boardArray.map(x => x)
    mapMaker(aiArray)
    // Grab the center, if it can.
    if (aiArray.some(biggerThanFive)) {
      aiChoice = aiArray.findIndex(biggerThanFive)
      return aiChoice
      // Otherwise, grab a corner.
    } else if (aiArray.some(biggerThanThree)) {
      aiChoice = aiArray.findIndex(biggerThanThree)
      return aiChoice
      // Otherwise, grab SOMETHING.
    } else {
      const max = Math.max(aiArray)
      aiChoice = aiArray.findIndex(max)
      return aiChoice
    }
  }
}

// Make a choice using the aiChoice function, then update the API accordingly,
// and make the board reflect that choice.
const aiUpdate = function (boardArray) {
  const html = (`<p>O</p>`)
  let aiChoice = aiMove(boardArray)
  store.aiChoice = aiChoice
  let cellChoice = ''
  // This is a clunky solution to a strange problem: 0 is returned as 'undefined'
  // in the aiChoice function, for reasons I don't understand, even if console
  // logs correctly as '0' before being returned.
  if (aiChoice !== undefined) {
    cellChoice = '#' + aiChoice + '2'
  } else if (aiChoice === undefined) {
    cellChoice = '#02'
    aiChoice = 0
  }
  const arrayUpdate = {
    game: {
      cell: {
        index: aiChoice,
        value: 'o'
      },
      over: false
    }
  }
  const cellUpdate = JSON.stringify(arrayUpdate)
  $(cellChoice).html(html)
  api.updateGame(cellUpdate)
    .then(aiUpdateGameSuccess)
    .catch(aiUpdateGameFailure)
}

// Clear any errors from the page's display.
const aiMsgClear = function () {
  $('#ai-user-msg').html('')
}

// Makes the API reflect that the game is over, shows reset button.
const aiMarkGameOver = function (move, index) {
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
    .then(aiEndGameSuccess)
    .catch(aiEndGameFailure)
}

const aiUpdateGameSuccess = function (data) {
// Make the stored game reflect the updated API game.
  store.game = data.game
  // Prepare variables if game is over.
  const move = store.currentPlayer.toLowerCase()
  const index = store.currentIndex
  // Check if this is a winning move.
  if (win.winEvent(store.game.cells) === true) {
    // If they've won, tell User.
    const winHtml = (`<B>${store.currentPlayer} won!</B>`)
    $('#ai-user-msg').html(winHtml)
    // Mark the game over.
    aiMarkGameOver(move, index)
  } else if (store.game.cells.includes('')) {
    // If there are still blank cells in the board, continue.
    // Clear any errors from the display.
    aiMsgClear()
    // Increase the turn.
    store.turnCounter = store.turnCounter + 1
    // Show user current turn.
    if (!(store.turnCounter % 2 === 0)) {
      $('#even').addClass('secret')
      $('#odd').removeClass('secret')
    } else {
      $('#even').removeClass('secret')
      $('#odd').addClass('secret')
      store.currentPlayer = 'O'
    }
    // Flip the ai.
    store.aiTime = !store.aiTime
    // Initiate AI choice.
    if (store.aiTime === true) {
      aiUpdate(store.game.cells)
    }
  } else {
    // If there are no blank cells, mark the game over.
    // Tell the user.
    const tieHtml = (`<p><B>Tie!</B></p>`)
    $('#ai-user-msg').html(tieHtml)
    aiMarkGameOver(move, index)
  }
}

// Shows user a message if the game failed to update.
const aiUpdateGameFailure = function (data) {
  const invalidMoveHtml = (`<B>How bizzare.</B>`)
  $('#ai-user-msg').html(invalidMoveHtml)
}

const aiEndGameSuccess = function (data) {
// Make the stored game reflect the updated API game.
  store.game = data.game
  // Tell player the game is over.
  const endMoveHtml = (`<p><B>Game over.</B></p>`)
  $('#ai-user-msg').append(endMoveHtml)
  $('#ai-reset-game').show()
}

const aiEndGameFailure = function (data) {
  // Tell player something went wrong.
  const invalidMoveHtml = (`<B>How bizzare.</B>`)
  $('#user-msg').html(invalidMoveHtml)
}

module.exports = {
  aiUpdateGameFailure,
  aiUpdateGameSuccess
}
