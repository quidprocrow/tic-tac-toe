'use strict'

const config = require('../config')

// Signs in user.
const signInUser = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}

module.exports = {
  signInUser
}
