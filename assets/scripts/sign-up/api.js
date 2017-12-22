'use strict'

const config = require('../config')

const signUpUser = function (data) {
  console.log(config.apiOrigin)
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

module.exports = {
  signUpUser
}
