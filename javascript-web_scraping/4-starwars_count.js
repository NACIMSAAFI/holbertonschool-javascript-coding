#!/usr/bin/node

const request = require('request');

const url = process.argv[2];

request(url, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    const results = JSON.parse(body).results;
    const count = results.reduce((acc, movie) => {
      if (movie.characters.some((character) => character.endsWith('/18/'))) {
        acc++;
      }
      return acc;
    }, 0);
    console.log(count);
  } else {
    console.error('Error:', error);
  }
});
