'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

let turnCounter = 1
const boardArray = [ '', '', '', '', '', '', '', '', '' ]
const getData = function (box) {
  return $(box).data('cell-index')
}
const setMove = function (move, boardArray, index) {
  boardArray[index] = move
  console.log(boardArray)
}

const clickEvent = function () {
  console.log('Clicked', this.id)
  const boxId = '#' + this.id
  console.log('It is the', turnCounter, 'round.')
  boardMove(boxId)
}

const boardMove = function (boxId) {
  const xHtml = (`<p>X</p>`)
  const oHtml = (`<p>O</p>`)
  let move = ''
  const boardCell = getData(boxId)
  console.log(boardArray)
  console.log(boardCell)
  if (boardArray[boardCell] === '') {
    console.log('board cell is', boardCell)
    if (!(turnCounter % 2 === 0)) {
      $(boxId).html(xHtml)
      move = 'x'
      console.log(move)
      setMove(move, boardArray, boardCell)
      turnCounter++
    } else {
      $(boxId).html(oHtml)
      move = 'o'
      console.log(move)
      setMove(move, boardArray, boardCell)
      console.log('o')
      turnCounter++
    }
  } else {
    console.log('Cell has been chosen!')
  }
}

$(() => {
  setAPIOrigin(location, config)
  $('#0').on('click', clickEvent)
  $('#1').on('click', clickEvent)
  $('#2').on('click', clickEvent)
  $('#3').on('click', clickEvent)
  $('#4').on('click', clickEvent)
  $('#5').on('click', clickEvent)
  $('#6').on('click', clickEvent)
  $('#7').on('click', clickEvent)
  $('#8').on('click', clickEvent)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
