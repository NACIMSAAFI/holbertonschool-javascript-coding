#!/usr/bin/node

const request = require('request');

request(process.argv[2], (err, response, body) => {
  if (err) {
    console.error('Error:', err);
  } else {
    const data = JSON.parse(body);
    const films = data.results;
    let count = 0;

    films.forEach(film => {
      if (film.characters.includes(`https://swapi-api.hbtn.io/api/people/${18}/`)) {
        count++;
      }
    });

    console.log(count);
  }
});
