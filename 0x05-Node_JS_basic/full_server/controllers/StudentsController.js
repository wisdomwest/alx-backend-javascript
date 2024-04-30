import readDatabase from '../utils';

const MAJORS = ['CS', 'SWE'];
const dataPath = process.argv[2];

class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(dataPath)
      .then((fields) => {
        let responseText = 'This is the list of our students';

        const students = Object.keys(fields).sort();
        students.forEach((student) => {
          const count = fields[student].length;
          const name = fields[student].join(', ');

          responseText += `\nNumber of students in ${student}: ${count}. List: ${name}`;
        });

        response.status(200).send(responseText);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (!MAJORS.includes(major)) {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(dataPath)
      .then((fields) => {
        const students = fields[major];
        const names = students.join(', ');

        response.status(200).send(`List: ${names}`);
      })
      .catch(() => response.status(500).send('Cannot load the database'));
  }
}

export default StudentsController;
module.exports = StudentsController;
