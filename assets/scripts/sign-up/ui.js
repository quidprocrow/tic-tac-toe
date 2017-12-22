'use strict'

const store = require('../store')

// Voluntary redirect, used in both success or failure.
const redirect = function () {
  $('#sign-up').hide()
  $('#sign-in').show()
  $('#sign-up-notification').html('')
}

// Hide the previous section, show the profile, and store user information.
const signUpSuccess = function (data) {
  store.user = data.user
  console.log(data)
  const successHtml = (`<p>Success, <b>${store.user.email}</b>!</p>
    <p>Please <a id="sign-in-redirect">sign in</a>.</p>
    `)
  $('#sign-up-notification').html(successHtml).attr('class', 'sign-notice')
  $('#sign-in-redirect').on('click', redirect)
}

// Display the fact of an error to the user.
const signUpFailure = function (data) {
  const errorHtml = (`<p>
    <b>Oops!</b> There's been an error!
    </p>
    <p>Did you perhaps need to <a id="sign-in-redirect">sign in</a>?</p>
    <p>Contact the
    <a href="mailto:windmillwarrior@gmail.com">administrator</a> otherwise.</p>
    `)
  $('#sign-up-notification').html(errorHtml).attr('class', 'sign-notice')
  $('#sign-in-redirect').on('click', redirect)
}

module.exports = {
  signUpSuccess,
  signUpFailure
}
