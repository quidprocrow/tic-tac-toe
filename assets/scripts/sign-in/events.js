'use strict'
const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api')
const ui = require('./ui')

// User is signed in and redirected to profile page upon success; otherwise,
// user is notified that there's been an error and notified to contact
// an admin, or go to sign in page.
// On success, user information is stored.
// Either way, form is cleared.
const signIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  $('#sign-in-form').find('input[type=text], textarea').val('')
  $('#sign-in-form').find('input[type=password], textarea').val('')
  api.signInUser(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

// Add click events for the sign-in section form.
const addSignInHandlers = function () {
  $('#sign-in-form').on('submit', signIn)
}

module.exports = {
  addSignInHandlers
}
