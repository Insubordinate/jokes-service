const express = require('express');
const app = express();
const { Joke } = require('./db');
const {Op} = require('sequelize')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/jokes', async (req, res, next) => {
  try {
    // TODO - filter the jokes by tags and content
    id = req.query.id ? req.query.id : null
    content = req.query.joke ? req.query.joke : null
    var jokes = [];

    if (id && content) {
      jokes = await Joke.findAll(
        {
          where: {
            joke:{
              [Op.substring]:content
            },
            id:id
          }
        }
      )

    } else if (id) {
      jokes = await Joke.findAll(
        {
          where: {
            id: id
          }
        })

    } else if (content) {
      jokes = await Joke.findAll(
        {
          where: {
            joke:{
              [Op.substring]:content
            }
          }
        }
      )
    } else {
      jokes = await Joke.findAll()
    }


    res.send(jokes);
  } catch (error) {
    console.error(error);
    next(error)
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
