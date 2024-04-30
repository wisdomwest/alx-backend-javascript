const fs = require('fs');
const express = require('express');

const PORT = 1245;
const HOST = 'localhost';
const app = express();
const dataPath = process.argv.length > 2 ? process.argv[2] : '';

app.get('/', ((req, res) => {
  res.send('Hello Holberton School!');
}));

const countStudents = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      reject(Error('Cannot load the database'));
      return;
    }

    let response = '';

    const lines = data.split('\n').filter((line) => line !== '').slice(1);
    const students = lines.map((line) => line.split(','));

    response += `Number of students: ${students.length}`;

    const fields = {};

    students.forEach((student) => {
      const firstName = student[0];
      const field = student[3];

      if (!fields[field]) {
        fields[field] = [firstName];
      } else {
        fields[field].push(firstName);
      }
    });

    for (const field in fields) {
      if (Object.hasOwnProperty.call(fields, field)) {
        const names = fields[field].join(', ');
        const count = fields[field].length;

        response += `\nNumber of students in ${field}: ${count}. List: ${names}`;
      }
    }

    resolve(response);
  });
});

app.get('/students', async (req, res) => {
  countStudents(dataPath)
    .then((data) => res.send(`This is the list of our students\n${data}`))
    .catch((error) => res.send(`This is the list of our students\n${error.message}`));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

module.exports = app;
