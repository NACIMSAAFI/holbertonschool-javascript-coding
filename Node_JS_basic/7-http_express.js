const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;

// Asynchronous function to read and process the CSV file
const countStudents = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data.split('\n');
    const students = lines.slice(1).filter((line) => line.trim() !== '').map((line) => line.split(','));
    const numberOfStudents = students.length;
    const fields = {};

    students.forEach((student) => {
      const field = student[3];
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(student[0]);
    });

    resolve({ numberOfStudents, fields });
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Students route
app.get('/students', (req, res) => {
  const databasePath = process.argv[2];

  countStudents(databasePath)
    .then(({ numberOfStudents, fields }) => {
      let responseText = 'This is the list of our students\n';
      responseText += `Number of students: ${numberOfStudents}\n`;
      for (const [field, students] of Object.entries(fields)) {
        responseText += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
      }
      res.send(responseText.trim());
    })
    .catch(() => {
      res.send('This is the list of our students\nCannot load the database');
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
