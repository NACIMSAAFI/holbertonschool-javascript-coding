const fs = require('fs').promises;

function countStudents(path) {
  return fs.readFile(path, 'utf8')
    .then((data) => {
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      if (lines.length <= 1) {
        throw new Error('Cannot load the database');
      }

      const students = {};
      const headers = lines[0].split(',');

      for (let i = 1; i < lines.length; i += 1) {
        const studentData = lines[i].split(',');
        if (studentData.length === headers.length) {
          const field = studentData[3];
          if (!students[field]) {
            students[field] = [];
          }
          students[field].push(studentData[0]);
        }
      }

      const totalStudents = Object.values(students).reduce((acc, arr) => acc + arr.length, 0);
      console.log(`Number of students: ${totalStudents}`);

      Object.keys(students).forEach((field) => {
        const list = students[field].join(', ');
        console.log(`Number of students in ${field}: ${students[field].length}. List: ${list}`);
      });
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;
