import fs from 'fs';

const readDatabase = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    if (data) {
      const lines = data.split('\n').filter((line) => line !== '').slice(1);
      const students = lines.map((line) => line.split(','));

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

      resolve(fields);
    }
  });
});

export default readDatabase;
module.exports = readDatabase;
