'use strict'

const store = require('../store')

// Hide the previous section, show the profile, and store user information.
const signInSuccess = function (data) {
  $('#greeting-space').show()
  $('#sign-space').hide()
  $('.non-game').show()
  $('.sign-link').hide()
  $('#sign-in').hide()
  $('#profile').show()
  // Clear any errors from previous sign in attempts.
  $('#sign-in-error').html('')
  $('#sign-up-notification').html('')
  store.user = data.user
  const userGreet = store.user.email.split('@')
  // Greet the user.
  if (userGreet[0].length < 16) {
    $('.user-greeting').html(userGreet[0]).css('text-transform', 'uppercase')
  } else {
    $('.user-greeting').html('Friend').css('text-transform', 'uppercase')
  }
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
