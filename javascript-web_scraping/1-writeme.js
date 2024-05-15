#!/usr/bin/node

const fs = require('fs');

const filePath = process.argv[2];

buffer = process.argv[3];

fs.writeFile(filePath, buffer, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
});
