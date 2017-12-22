'use strict'
const config = require('../config')
const store = require('../store')

// Creates a game via an empty post request.
const createGame = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

// Updates a game's moves.
const updateGame = function (data) {
  // console.log('I am the data', data)
  // console.log('I am the store.game.id', store.game.id)
  // console.log('I am the user token', store.user.token)
  return $.ajax({
    url: config.apiOrigin + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token,
      'Content-Type': 'application/json'
    },
    data
  })
}

module.exports = {
  createGame,
  updateGame
}
