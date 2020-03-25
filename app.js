/* eslint-disable semi */
'use strict';

const express = require('express')
const morgan = require('morgan')
const books = require('./books-data.js')
const cors = require('cors');


const app = express();

app.use(cors())
app.use(morgan('common'))

app.get('/books', (req, res) => {
  const { search = '', sort } = req.query;

  if (sort) {
    if (!['title', 'rank'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of title or rank');
    }
  }

  /*
  if ('sort' in req.query && (
    sort !== 'title && sort !== 'rank
  )) 
  {
    return res
        .status(400)
        .send('Sort must be one of title or rank');
  }
  */

  let results = books
    .filter(book =>
      book
        .title
        .toLowerCase()
        .includes(search.toLowerCase()));

  //square brackets are object notation this is a bubble sort
  //a = object1
  //b=object2
  //next iteration
  //a=object2
  //b=object3 and so on
  if (sort) {
    results
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
  }

  res
    .json(results);
});

module.exports = app