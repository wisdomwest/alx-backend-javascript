import readDatabase from "../utils";

const MAJORS = ['CS', 'SWE'];
const dataPath = process.argv[2];

class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(dataPath)
      .then((fields) => {
        let responseText = '';

        const arrange = (a, b) => {
          if (a[0].toLowerCase() < b[0].toLowerCase()) return -1;
          if (a[0].toLowerCase() > b[0].toLowerCase()) return 1;
          return 0;
        };

        for (const field in fields) {
          if (Object.hasOwnProperty.call(fields, field)) {
            const sortedNames = fields[field].sort(arrange);
            const names = sortedNames.join(', ');
            const count = sortedNames.length;

            responseText += `\nNumber of students in ${field}: ${count}. List: ${names}`;
      }
    }

    response.status(200).send(`This is the list of our students\n${responseText}`);
    })
    .catch((error) => response.status(500).send(`This is the list of our students\n${error.message}`));
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
      .catch((error) => response.status(500).send('cannot load the database'));

  }
}

export default StudentsController;
module.exports = StudentsController;
