[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Tic-Tac-Toe

This is a responsive single-page tic-tac-toe game that allows users to login in, update their account information, and play tic-tac-toe against a guest user on the same device.

It was created with
*  jQuery
*  Javascript
*  HTML
*  Sass
*  AJAX
*  JSON

The stylistic additions are credited in the **Credit** section of [`./index.html`](./index.html).

There is an [active site](http://quidprocrow.github.io/tic-tac-toe) for usage. To download and manipulate, follow the instructions below.

# Installation

1. Fork this repository.
1. Clone or download.
1. Install dependencies by entering `npm install` in terminal window when you are within the appropriate file path.
1. Manipulate code in your preferred text editor.
  -   **Note:** Using `grunt serve` in the terminal will create a live version of your tic-tac-toe game using the development API.
  - Remember that any users (and accordingly any games created by users) **do not transfer** to the production API.
  - When ready, use `grunt deploy` to upload your version to github pages.

# Structure

The major files to attend to are the [`./index.html`](./index.html), and all files under [`./assets/`], both the SASS file under [`./assets/styles`](./assets/styles) and the various scripts under [`./assets/scripts`](./assets/scripts/).

- [`index.js`] adds the event handlers that direct all game and user actions, as well as hiding and showing sections as appropriate. To start, a user sees only the ability to sign-in or sign-up.
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
  1. **SIGN UP** - [`./assets/scripts/sign-up/`](./assets/scripts/sign-up/)
    Contains scripts that create an [event](./assets/scripts/sign-up/events.js) when a user submits a form with new user credentials. That event makes a request to the [api](./assets/scripts/sign-up/api.js). The [user](./assets/scripts/sign-up/ui.js) is notified of the request's success or lack thereof. If successful, directed to **SIGN IN**.
  1. **SIGN IN** - [`./assets/scripts/sign-in/`](./assets/scripts/sign-in/)
    Contains scripts that create an [event](./assets/scripts/sign-in/events.js) when a user submits a form with login credentials. That event makes a request to the [api](./assets/scripts/sign-in/api.js). The [user](./assets/scripts/sign-in/ui.js) is notified of the request's success or lack thereof. If unsuccessful, directed to **SIGN UP**. If successful, directed to their user **PROFILE** with certain user information stored for authentication in other API requests.
  1. **PROFILE** - [`./assets/scripts/profile/`](./assets/scripts/profile)
    Contains scripts that create variety of [events](./assets/scripts/profile/events.js) regarding the behavior of the navigation or the creation of games. The navigation allows the user to view *instructions* or *credit*, as well as making  [api](./assets/scripts/profile/api.js) requests to *change password*, view their *personal statistics* which update whenever the section is loaded, *sign out*, or *play a game*.  The [user](./assets/scripts/sign-in/ui.js) is notified of the request's success or lack thereof, where success amounts to the correct section's display and failure is an appended paragraph on the current section. Should a user play a [game](./assets/scripts/board/), the API request stores that game as well as select user information and  the usual navigation is obscured until they quit that game.
  1. **BOARD** - [`./assets/scripts/board/`](./assets/scripts/board)
    Contains scripts that create variety of [events](./assets/scripts/board/events.js) specific to the game board used   : attaches click events to the board as well as allowing to user to exit the board area by ending a game (whether or not it is yet over). Pending whether or not the click occurs on a space on the board marked as clear in the stored game, each click event initiates a request to the [api](./assets/scripts/board/api.js) to update the game remotely, [alerted](./assets/scripts/board/ui.js) on success or failure. Should that click have initiated a move that finishes the game, either through victory or by filling in all available spaces, the user is alerted and a reset game button appears.
  1. **AI** - [`./assets/scripts/board/ai`](./assets/scripts/board/ai)
    Contains scripts that create variety of [events](./assets/scripts/board/events.js) specific to games against AI: attaches click events to the board as well as allowing to user to exit the board area by ending a game (whether or not it is yet over). Pending whether or not the click occurs on a space on the board marked as clear in the stored game, each click event initiates a request to the [api](./assets/scripts/board/api.js) to update the game remotely, [alerted](./assets/scripts/board/ui.js) on success or failure. Should that click have initiated a move that finishes the game, either through victory or by filling in all available spaces, the user is alerted and a reset game button apears. If that click does not lead to the end of the game, the **AI** is initiated, which makes a choice based on how the board looks and then makes an API request, checking for a win or a game ending just as with a user.

# Wireframes

The wireframing for this project is contained within the [`./wireframes/`](./wireframes/) file. Development began with figuring out the game logic, wth the user features structured around the question of when to have access to the game.

# User Stories

* As a user, I want to be able to play a tic-tac-toe game.
* As a user, I want to be able to quit that tic-tac-toe game at any point.
* As a user, I want to know when the game is over.
* As a user, I want to know who won.
* As a user, I want to be able to start a new game after the old one ends.
* As a user, I want to know my personal statistics.
* As a user, I want to be able to change my password.
* As a user, I want to be able to sign out.
* As a user, I want failure to sign in to be visible.
* As a user, I want failure to sign up to be visible.


Since a game can only created by an authenticated user, the site is designed around barring access to creating a game unless a proper **sign-in** by a previously **signed-up** user occurs.

Once that obtains, the user has access to a profile page with the option to **create a game against a guest**, with a navigation menu directing the user **view instructions**, **view statistics**, **change their password**, **view the credits**, or **sign out**.

**Creating a game** stores game information, and directs the user to a board that indicates whose turn it is and notifies when the game ends, with the results (tie or win by a particular player). When the game is over, it is marked as such.

When in-game, the only navigation option for the user is to **quit the game**, which clears the game board, resets all stored game information, restores the full navigation, and allows the user to create a new game.

Note that **quitting** does not mark the game as over.

## Future Work

- [x] Create a game board for a user and a guest on the same device.
- [x] Create an artificial intelligence. *Now inactive.*
- [ ] Allow multiple users to play on the same device.
- [ ] Allow multiple users to play on remote devices.
- [ ] Create TIC-PAC-TOE.

My hope, entering into this project, was to create a functional tic-tac-toe game. The puzzle of what makes a winning game strategy -- and what makes a game fun -- pushed me to design an artificial intelligence to play against, now hidden on the deployed site but you may view the logic [`./assets/scripts/board/ai`](./assets/scripts/board/ai). **Brian Keegan** eventually convinced me that, even if a winning first-player strategy prioritizes grabbing corners over the center, a good second-player strategy heads straight to the center.

Future additions should include multi-user games, as well as a modified version of the game: **TIC-PAC-TOE**, where each move has a random possibly of a previous move being eaten by Ms. Pac-Man.

 The drive for both of these extensions is the capabilities of the API and what makes an enjoyable game. There's something primal about competing against another person instead of an artificial strategist, which makes it that much more fun -- or perhaps it's that games are things meant to be shared. The API supports the ability for multiple user games.


## Known Issues

I have one personal coding addition I'd like to make: depending on the internet speed of the user, sometimes adding moves to the game takes sufficiently long that a user is able to make a second move while using the same player, e.g. X will appear twice in a row. It's a simple fix, but a low priority one at this time, as the internet speed must be truly glacial for this to occur.

Beyond that, there isn't much elegance to my code, and what I'd like to do is to refactor it down to the bones. I was trying to be both an idealist and engineer: I had some ideas I thought were cool, and I didn't care how they got done. Beyond repeating myself unnecessarily, that means there are some ugly work-arounds that should be removed, once I understand coding better.

## Credit

Beyond the resources used in the interface (credited within the project), the actual coding is a result of course work at **General Assembly** created by an instructor-team lead by **Michael Finneran**, as well as conversations with my cohort. In particular, **Nathan Dunn** was very helpful in discussions about the artificial intelligence, as were **Brian Keegan** and **Shaun White**. **Rebecca Coras** and **Sarah Burke** both proofread this for project requirements and general errors which helped *immensely*. And who knows how much would have been written without constant access to oatmeal? (Thanks, **GA**.)
