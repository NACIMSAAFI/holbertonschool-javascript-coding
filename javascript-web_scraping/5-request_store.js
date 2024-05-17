#!/usr/bin/node

const request = require('request');
const fs = require('fs');

// Get the URL and the file path from the command-line arguments
const url = process.argv[2];
const filePath = process.argv[3];

// Make the HTTP request to the specified URL
request(url, (err, response, body) => {
  if (err) {
    console.error('Error:', err);
  } else {
    // Write the response body to the specified file
    fs.writeFile(filePath, body, 'utf-8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      }
    });
  }
});
