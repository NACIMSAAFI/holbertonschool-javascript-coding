#!/usr/bin/node

const fs = require('fs');

const filePath = process.argv[2];
let buffer = process.argv[3];

fs.writeFile(filePath, buffer, 'utf-8', (err) => {
  if (err) {
    console.error(err);
    return;
  }
});
