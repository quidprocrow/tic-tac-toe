'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

let turnCounter = 1

const clickEvent = function () {
  console.log('Clicked', this.id)
  const boxId = '#' + this.id
  $(boxId).css('background', 'pink')
  console.log('It is the', turnCounter, 'round.')
  boardMove(boxId)
  turnCounter++
}

const boardMove = function (boxId) {
  const xHtml = (`<p>X</p>`)
  const oHtml = (`<p>O</p>`)
  if (turnCounter === 0 || !(turnCounter % 2 === 0)) {
    $(boxId).html(xHtml)
    console.log('x')
  } else {
    $(boxId).html(oHtml)
    console.log('o')
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
