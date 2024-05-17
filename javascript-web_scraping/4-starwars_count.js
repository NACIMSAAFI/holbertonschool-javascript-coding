#!/usr/bin/node

const request = require('request');

const url = process.argv[2];
const characterId = 18;

request(url, (err, response, body) => {
  if (err) {
    console.error('Error:', err);
  } else {
    const data = JSON.parse(body);
    const films = data.results;
    let count = 0;

    films.forEach(film => {
      if (film.characters.includes(`https://swapi-api.hbtn.io/api/people/${characterId}/`)) {
        count++;
      }
    });

    console.log(count);
  }
});
