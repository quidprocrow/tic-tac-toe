'use strict'

const store = require('../store')

// Hide the previous section, show the profile, and store user information.
const signOutSuccess = function (data) {
  // console.log('Success')
  $('#profile').hide()
  $('#intro').show()
  $('#change-pass').hide()
  $('#game-board').hide()
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#navigation').hide()
  $('#instructions').hide()
  $('#credit').hide()
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

// Successfully begins a game.
const beginGameSuccess = function (data) {
  store.game = data.game
  // console.log('I am game data', data.game)
  // console.log('I am stored game data', store.game)
  store.turnCounter = 1
  $('#profile').hide()
  $('#game-board').show()
  $('#reset-game').hide()
  $('.non-game').hide()
  $('.game-link').show()
  const userGreet = store.user.email.split('@')
  $('#even').addClass('secret')
  if (userGreet[0].length > 16) {
    $('.name').css('display', 'none')
    $('.turn').css('margin-top', '10px')
  } else {
    $('.other-greeting').html('guest')
  }
}

// Fails to begin a game.
const beginGameFailure = function () {
  const errorHtml = (`<p>
    <b>Oops!</b> There's been an error!
    </p>
    <p>Contact the
    <a href="mailto:windmillwarrior@gmail.com">administrator</a>.</p>
    `)
  $('#profile').append(errorHtml)
}

module.exports = {
  signOutFailure,
  signOutSuccess,
  changePassSuccess,
  changePassFailure,
  beginGameFailure,
  beginGameSuccess
}
