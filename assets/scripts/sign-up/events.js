'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api')
const ui = require('./ui')

// Takes sign up form information, uses get form fields to create appropriate
// object, and sends that as data to the API. On success, user is notified and
// and redirected to sign in screen; notified upon failure.
const signUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUpUser(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
  $('#sign-up-form').find('input[type=text], textarea').val('')
  $('#sign-up-form').find('input[type=password], textarea').val('')
}

// Add click events for the sign up section form; prevents refresh.
const addSignUpHandlers = function () {
  $('#sign-up-form').on('submit', signUp)
}

module.exports = {
  addSignUpHandlers
}
