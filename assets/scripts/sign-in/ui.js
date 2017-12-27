'use strict'

const store = require('../store')

// Hide the previous section, show the profile, and store user information.
const signInSuccess = function (data) {
  $('#sign-in').hide()
  $('#profile').show()
  store.user = data.user
  const userGreet = store.user.email.split('@')
  $('#profile-greeting').html('Hi ' + userGreet[0] + ' !').css('text-transform', 'uppercase')
  $('#sign-in-error').html('')
}

// Display the fact of an error to the user.
const signInFailure = function (data) {
  const redirect = function () {
    $('#sign-in').hide()
    $('#sign-up').show()
    $('#sign-in-error').html('')
  }
  const errorHtml = (`<p>
    <b>Oops!</b> There's been an error!
    </p>
    <p>Did you perhaps need to <a id="sign-up-redirect">sign up</a>?</p>
    <p>Contact the
    <a href="mailto:windmillwarrior@gmail.com">administrator</a> otherwise.</p>
    `)
  $('#sign-in-error').html(errorHtml).attr('class', 'sign-notice')
  $('#sign-up-redirect').on('click', redirect)
}

module.exports = {
  signInSuccess,
  signInFailure
}
