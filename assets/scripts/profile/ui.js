'use strict'

const store = require('../store')
const win = require('../board/win')

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
  $('#personal-statistics').hide()
  $('#profile-error').remove()
  $('#show-games').html('')
  $('.game-link').hide()
  $('.non-game').hide()
  $('.sign-link').hide()
  $('#vs-play-button').hide()
  $('#greeting-space').hide()
  $('#sign-space').hide()
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
  $('#profile-error').html(errorHtml).addClass('scooch')
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
// Stores the game data returned by the API, sets the turn counter, hides all
// other sections, and shows the game-specific navigation.
const beginGameSuccess = function (data) {
  store.game = data.game
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

// Successfully begins an ai game.
// Stores the game data returned by the API, sets the turn counter, hides all
// other sections, and shows the game-specific navigation.
// Major differences are in the ids (different html section).
const beginAiGameSuccess = function (data) {
  store.game = data.game
  store.aiTime = false
  store.turnCounter = 1
  $('#profile').hide()
  $('#game-board').hide()
  $('#ai-game-board').show()
  $('#ai-reset-game').hide()
  $('.non-game').hide()
  $('.game-link').show()
  const userGreet = store.user.email.split('@')
  $('#ai-even').addClass('secret')
  if (userGreet[0].length > 16) {
    $('.name').css('display', 'none')
    $('.turn').css('margin-top', '10px')
  } else {
    $('.other-greeting').html('John Cena')
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
  $('#profile-error').html(errorHtml).addClass('scooch')
}

// Fails to begin a game.
const beginAiGameFailure = function () {
  const errorHtml = (`<p><b>Oops!</b> There's been an error!
    </p>
    <p>Contact the
    <a href="mailto:windmillwarrior@gmail.com">administrator</a>.</p>
    `)
  $('#profile-error').html(errorHtml).addClass('scooch')
}

// When the stats page is loaded, takes data from a GET request to populate
// a series of statistics.
// Will do this each time the stats page is clicked, so the data is always
// up to date.
const statsLoadSuccess = function (data) {
  store.gamesStats = data.games
  const overTest = (input) => input.over === true
  const totalPlayed = data.games.length
  let statHtml = (`${totalPlayed}`)
  $('#total-games').html(statHtml)
  const totalOver = data.games.filter(overTest)
  const totalIncomplete = totalPlayed - totalOver.length
  statHtml = (`${totalIncomplete}`)
  $('#total-games-incomplete').html(statHtml)
  const winCalculation = (accumulator, currentValue) => {
    if (win.xWinEvent(currentValue.cells) === true) {
      accumulator = accumulator + 1
    }
    return accumulator
  }
  const tieCalculation = (accumulator, currentValue) => {
    if (win.winEvent(currentValue.cells) === false) {
      accumulator = accumulator + 1
    }
    return accumulator
  }
  const totalWon = data.games.reduce(winCalculation, 0)
  statHtml = (`${totalWon}`)
  $('#total-games-won').html(statHtml)
  const totalTied = totalOver.reduce(tieCalculation, 0)
  statHtml = (`${totalTied}`)
  $('#total-games-tied').html(statHtml)
}

const statsLoadFailure = function (data) {
  const errorHtml = (`<p>Hmm. Something is terribly wrong.</p>`)
  $('#game-error').html(errorHtml)
}

const secondPlayerSuccess = function (data) {
  store.secondUser = data.user
  const userGreet = store.secondUser.email.split('@')
  const helloHtml = (`<p>
    Get ready, <B>${userGreet}.</p>
    `)
  $('#second-sign-in-notice').html(helloHtml).attr('class', 'sign-notice')
  $('#second-player-form').hide()
  $('#second-player-begin').show()
}

const secondPlayerFailure = function () {
  const errorHtml = (`<p>
    <b>Oops!</b> There's been an error!
    </p>
    <p>Did you perhaps type your password otherwise?</p>
    <p>Contact the
    <a href="mailto:windmillwarrior@gmail.com">administrator</a> otherwise.</p>
    `)
  $('#second-sign-in-notice').html(errorHtml).attr('class', 'sign-notice')
}

// Need to work on this when the API isn't down.
//
// const secondPlayerLocalSuccess = function (data) {
//   store.secondUser = data.user
//   const userGreet = store.secondUser.email.split('@')
//   const helloHtml = (`<p>
//     Get ready, <B>${userGreet}.</p>
//     `)
//   $('#second-sign-in-notice').html(helloHtml).attr('class', 'sign-notice')
//   $('#second-player-form').hide()
//   $('#second-player-begin').show()
// }
//
// const secondPlayerLocalFailure = function () {
//   const errorHtml = (`<p>
//     <b>Oops!</b> There's been an error!
//     </p>
//     <p>Did you perhaps type your password otherwise?</p>
//     <p>Contact the
//     <a href="mailto:windmillwarrior@gmail.com">administrator</a> otherwise.</p>
//     `)
//   $('#second-sign-in-notice').html(errorHtml).attr('class', 'sign-notice')
// }

module.exports = {
  signOutFailure,
  signOutSuccess,
  changePassSuccess,
  changePassFailure,
  beginGameFailure,
  beginGameSuccess,
  statsLoadSuccess,
  statsLoadFailure,
  beginAiGameFailure,
  beginAiGameSuccess,
  secondPlayerSuccess,
  secondPlayerFailure
}
