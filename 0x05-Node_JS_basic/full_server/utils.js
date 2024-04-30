import fs from 'fs';

const readDatabase = (path) => new Promise((resolve, reject) => {
  if (!path) {
    reject(new Error('Cannot load the database'));
  }
  if (path) {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const fileLines = data.trim().split('\n');
        const studentGroups = {};
        const dbFieldNames = fileLines[0].split(',');
        const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

        for (const line of fileLines.slice(1)) {
          const studentRecord = line.split(',');
          const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
          const field = studentRecord[studentRecord.length - 1];
          if (!studentGroups[field]) {
            studentGroups[field] = [];
          }
          const student = {};
          for (let i = 0; i < studentPropNames.length; i += 1) {
            student[studentPropNames[i]] = studentPropValues[i];
          }
          studentGroups[field].push(student);
        }
        resolve(studentGroups);
      }
    })
  }
});

export default readDatabase;
module.exports = readDatabase;
