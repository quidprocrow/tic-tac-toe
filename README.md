[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Tic-Tac-Toe

This is a responsive single-page tic-tac-toe game that allows users to login in, update their account information, and play tic-tac-toe against a guest user on the same device.

It was created with
* jQuery
*  Javascript
*  HTML
*  Sass
⋅⋅* Both the scripting language and the attitude.

There is an [active site] (http://quidprocrow.github.io/tic-tac-toe) for usage. To download and manipulate, follow the instructions below.

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
⋅⋅⋅ For example, the scripts for the events in the 'sign-in' section of the game are contained in [`./assets/scripts/sign-in/`](./assets/scripts/signin/), split into JS files for making an API request, for handling events on the page, and for presenting user interface information.
