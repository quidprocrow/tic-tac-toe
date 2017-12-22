'use strict'

const store = require('../store')

// Hide the previous section, show the profile, and store user information.
const signOutSuccess = function (data) {
  // console.log('Success')
  $('#profile').hide()
  $('#intro').show()
  store.user = null
  // console.log(store)
  $('#game-title').text('BYE BYE BYE').css('text-transform', 'uppercase')
}

// Display the fact of an error to the user.
const signOutFailure = function (data) {
  const errorHtml = (`<p>
    <b>Oops!</b> There's been an error!
    </p>
    <p>Did you perhaps need to <a id="sign-up-redirect">sign up</a>?</p>
    <p>Contact the
    <a href="mailto:windmillwarrior@gmail.com">administrator</a> otherwise.</p>
    `)
  $('#profile').append(errorHtml)
}

// Indicate success and invite user back to profile.
const changePassSuccess = function () {
  const redirect = function () {
    $('#change-pass').hide()
    $('#profile').show()
  }
  // console.log('success')
  const successHtml = (`<p>
    <b>Excellent!</b> Back to <a id="pass-profile-redirect">your profile</a>, then?</p>
    `)
  $('#password-notification').html(successHtml).attr('class', 'center')
  $('#pass-profile-redirect').on('click', redirect)
}

// Display the fact of an error to the user.
const changePassFailure = function (data) {
  const errorHtml = (`<p>
    <b>Oops!</b> There's been an error!
    </p>
    <p>Please ensure you filled out both fields correctly.</p>
    <p>Contact the
    <a href="mailto:windmillwarrior@gmail.com">administrator</a> otherwise.</p>
    `)
  $('#password-notification').html(errorHtml).attr('class', 'center')
}

module.exports = {
  signOutFailure,
  signOutSuccess,
  changePassSuccess,
  changePassFailure
}
