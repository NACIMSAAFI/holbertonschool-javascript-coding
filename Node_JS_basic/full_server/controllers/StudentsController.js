import { readDatabase } from '../utils';

class StudentsController {
  static getAllStudents(req, res) {
    const databasePath = process.argv[2];

    readDatabase(databasePath)
      .then((fields) => {
        let responseText = 'This is the list of our students\n';
        const totalStudents = Object.values(fields).reduce((acc, list) => acc + list.length, 0);
        responseText += `Number of students: ${totalStudents}\n`;

        for (const [field, students] of Object.entries(fields).sort()) {
          responseText += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
        }

        res.status(200).send(responseText.trim());
      })
      .catch((err) => {
        res.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(req, res) {
    const databasePath = process.argv[2];
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(databasePath)
      .then((fields) => {
        if (!fields[major]) {
          res.status(500).send('Major parameter must be CS or SWE');
          return;
        }

        const students = fields[major];
        res.status(200).send(`List: ${students.join(', ')}`);
      })
      .catch((err) => {
        res.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
