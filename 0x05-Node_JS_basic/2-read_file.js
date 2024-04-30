const fs = require('fs');

const countStudents = (path) => {
  try {
    const data = fs.readFileSync(path, { encoding: 'utf8' }).split('\n')
      .filter((line) => line.length > 0)
      .slice(1)
      .map((line) => line.split(','))
      .filter((student) => student.length > 0 && student.length === 4);
    console.log(`Number of students: ${data.length}`);
    const subjects = {};
    for (const student of data) {
      if (!subjects[student[3]]) {
        subjects[student[3]] = [];
      }
      subjects[student[3]].push(student[0]);
    }
    for (const subject in subjects) {
      if (subject) {
        console.log(`Number of students in ${subject}: ${subjects[subject].length}. List: ${subjects[subject].join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

module.exports = countStudents;
