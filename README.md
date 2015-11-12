# Bring Back the Gifs

A simple node.js app to show images inline in HipChat via a /slash command
integration. I made this when our administrator turned this feature off.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone git@github.com:keymholio/bring-back-the-gifs.git # or clone your own fork
$ cd bring-back-the-gifs
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

## Documentation

This app listens for a `POST` at its root from HipChat and returns a
html message which is simply renders an image in the room. Note that this won't
work in private chats.

Add the integration in HipChat's webclient using either the `/gif` or `/img`
slash commands. Then you can do:

```
/gif http://keymholio.github.io/gifs/yes/yes-robert-redford.gif
/img http://i.imgur.com/dBK2yJK.png
```

which will produce:

![yes](http://keymholio.github.io/gifs/yes/yes-robert-redford.gif)

![yes](http://i.imgur.com/dBK2yJK.png)
