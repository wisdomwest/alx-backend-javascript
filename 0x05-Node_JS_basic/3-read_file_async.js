const fs = require('fs');

const countStudents = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      reject(Error('Cannot load the database'));
      return;
    }

    const lines = data.split('\n').filter((line) => line !== '').slice(1);
    const students = lines.map((line) => line.split(','));

    console.log(`Number of students: ${students.length}`);

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

        console.log(`Number of students in ${field}: ${count}. List: ${names}`);
      }
    }

    resolve();
  });
});

module.exports = countStudents;
