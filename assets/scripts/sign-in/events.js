'use strict'
const getFormFields = require('../../../lib/get-form-fields.js')

const signIn = function (event) {
  event.preventDefault()
  let data = event.target
  console.log(data)
  data = getFormFields(data)
  console.log(data.credentials)
}

// Add click events for the sign-in section form.
const addSignInHandlers = function () {
  $('#sign-in-form').on('submit', signIn)
}

module.exports = {
  addSignInHandlers
}
