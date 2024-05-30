const http = require('http');
const fs = require('fs').promises;
const url = require('url');

const countStudents = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.trim().split('\n');

    const students = lines.slice(1).filter((line) => line.trim() !== '');
    const totalStudents = students.length;

    const fields = {};

    students.forEach((student) => {
      const [firstname, , , field] = student.split(',');
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);
    });

    let result = `Number of students: ${totalStudents}\n`;
    for (const [field, names] of Object.entries(fields)) {
      result += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
    }
    return result.trim();
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

// Create the HTTP server
const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const cur = url.parse(req.url, true).path;
  if (cur === '/') {
    res.write('Hello Holberton School!');
    res.end();
  }
  if (cur === '/students') {
    res.write('This is the list of our students\n');
    countStudents(process.argv[2], res)
      .then((data) => {
        res.write(data);
        res.end();
      })
      .catch((error) => {
        res.write(error.message);
        res.end();
      });
  }
});
app.listen(1245);

module.exports = app;
