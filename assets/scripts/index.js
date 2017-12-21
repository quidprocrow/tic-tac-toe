'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const events = require('./events.js')

// Each individual board div has a click event attached upon load.
$(() => {
  setAPIOrigin(location, config)
  $('#0').on('click', events.clickEvent)
  $('#1').on('click', events.clickEvent)
  $('#2').on('click', events.clickEvent)
  $('#3').on('click', events.clickEvent)
  $('#4').on('click', events.clickEvent)
  $('#5').on('click', events.clickEvent)
  $('#6').on('click', events.clickEvent)
  $('#7').on('click', events.clickEvent)
  $('#8').on('click', events.clickEvent)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
