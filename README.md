[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Tic-Tac-Toe

This is a responsive single-page tic-tac-toe game that allows users to login in, update their account information, and play tic-tac-toe against a guest user on the same device.

It was created with
* jQuery
*  Javascript
*  HTML
*  Sass

The stylistic additions are credited in the *Credit* section of [`./index.html`](./index.html).

There is an [active site](http://quidprocrow.github.io/tic-tac-toe) for usage. To download and manipulate, follow the instructions below.

# Installation

1. Fork this repository.
1. Clone or download.
1. Install dependencies by entering `npm install` in terminal window when you are within the appropriate file path.
1. Manipulate code in your preferred text editor.
  -   *Note:* Using `grunt serve` in the terminal will create a live version of your tic-tac-toe game using the development API.
  - Remember that any users (and accordingly any games created by users) *do not transfer* to the production API.
  - When ready, use `grunt deploy` to upload your version to github pages.

# Structure

The major files to attend to are the [`./index.html`](./index.html), and all files under [`./assets/`], both the SASS file under [`./assets/styles`](./assets/styles) and the various scripts under [`./assets/scripts`](./assets/scripts/).

- [`index.js`] adds the event handlers that direct all game and user actions, as well as hiding and showing sections as appropriate.
- [`config.js`] sets the API url.
- [`lib/get-form-fields.js`] is a function provided by General Assembly Boston that accepts named input fields and returns an object that conforms to the input names as if they were sub-objects, e.g. an input with the name of "name[surname]" returns an object:
```
{
  name: {
    surname
  }
}

```
- The remaining scripts are broken into directories that represent the HTML sections where those scripts will be called.
  - For example, the scripts for the events in the 'sign-in' section of the game are contained in [`./assets/scripts/sign-in/`](./assets/scripts/signin/), split into JS files for making an API request, for handling events on the page, and for presenting user interface information.

# Development

The wireframing for this project is contained within the [`./wireframes/`](./wireframes/) file. Development began with figuring out the game logic, wth the user features structured around the question of when to have access to the game.

Since a game can only created by an authenticated user, the site is designed around barring access to creating a game unless a proper *sign-in* by a previously *signed-up* user occurs.

Once that obtains, the user has access to a profile page with the option to *create a game against a guest*, with a navigation menu directing the user *view instructions*, *view statistics*, *change their password*, *view the credits*, or *sign out*.

*Creating a game* stores game information, and directs the user to a board that indicates whose turn it is and notifies when the game ends, with the results (tie or win by a particular player). When the game is over, it is marked as such.

When in-game, the only navigation option for the user is to *quit the game*, which clears the game board, resets all stored game information, restores the full navigation, and allows the user to create a new game.

Note that *quitting* does not mark the game as over.

## Future Work

My hope is to add the ability to review the user's personal win and loss statistics, as well as two artificial intelligences to play against (who would feature in the user's statistics), as well as eventually adding the ability to play against remote users.

If all that works, I would also like to add the ability for a player to return to a game that was previously quit.

## Known Issues

I have one personal coding addition I'd like to make: depending on the internet speed of the user, sometimes adding moves to the game takes sufficiently long that a user is able to make a second move while using the same player, e.g. X will appear twice in a row. It's a simple fix, but a low priority one at this time, as the internet speed must be truly glacial for this to occur.
