'use strict'

const config = require('../config')

const signInUser = function (data) {
  console.log(config.apiOrigin)
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}

module.exports = {
  signInUser
}
