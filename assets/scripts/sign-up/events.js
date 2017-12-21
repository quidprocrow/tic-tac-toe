'use strict'
const getFormFields = require('../../../lib/get-form-fields.js')

const signUp = function (event) {
  event.preventDefault()
  let data = event.target
  console.log(data)
  data = getFormFields(data)
  console.log(data.credentials)
}

// Add click events for the sign up section form; prevents refresh.
const addSignUpHandlers = function () {
  $('#sign-up-form').on('submit', signUp)
}

module.exports = {
  addSignUpHandlers
}
