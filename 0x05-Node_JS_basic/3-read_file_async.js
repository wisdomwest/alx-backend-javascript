const fs = require('fs');

const countStudents = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
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
        for (let i = 0; i < studentPropNames.length; i++) {
          student[studentPropNames[i]] = studentPropValues[i];
        }
        studentGroups[field].push(student);
      }

      const totalStudents = Object.values(studentGroups)
        .reduce((total, group) => total + group.length, 0);
      console.log(`Number of students: ${totalStudents}`);
      
      for (const [field, group] of Object.entries(studentGroups)) {
        const studentNames = group.map(student => student.firstname).join(', ');
        console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
      }
      resolve(true);
    }
  });
});

module.exports = countStudents;
