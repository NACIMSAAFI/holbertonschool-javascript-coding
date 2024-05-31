import fs from 'fs';

export function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n');
      const fields = {};

      lines.slice(1).forEach(line => {
        if (line.trim() === '') return;
        const [firstname, , , field] = line.split(',');

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      });

      resolve(fields);
    });
  });
}
