const fs = require('fs');
const http = require('http');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
const dataPath = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataPath) {
    fs.readFile(dataPath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const report = [];
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

        const totalStudents = Object.values(studentGroups)
          .reduce((total, group) => total + group.length, 0);
        report.push(`Number of students: ${totalStudents}`);
        for (const [field, students] of Object.entries(studentGroups)) {
          if (students.length > 0) {
            report.push(`Number of students in ${field}: ${students.length}. List: ${students.map((student) => student.firstname).join(', ')}`);
          }
        }
        resolve(report.join('\n'));
      }
    });
  }
});

const server = [
  {
    route: '/',
    handler: (_, res) => {
      const data = 'Hello Holberton School!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', data.length);
      res.statusCode = 200;
      res.write(Buffer.from(data));
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const data = ['This is the list of our students'];

      countStudents(dataPath)
        .then((report) => {
          data.push(report);
          const resposneData = data.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', resposneData.length);
          res.statusCode = 200;
          res.write(Buffer.from(resposneData));
        })
        .catch((error) => {
          data.push(error instanceof Error ? error.message : error.toString());
          const resposneData = data.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', data.length);
          res.statusCode = 500;
          res.write(Buffer.from(resposneData));
        });
    },
  },
];

app.on('request', (req, res) => {
  for (const routes of server) {
    if (routes.route === req.url) {
      routes.handler(req, res);
      break;
    }
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

module.exports = app;
