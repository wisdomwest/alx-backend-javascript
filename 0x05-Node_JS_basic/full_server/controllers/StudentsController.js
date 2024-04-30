import readDatabase from "../utils";

const MAJORS = ['CS', 'SWE'];
const dataPath = process.argv[2];

class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(dataPath)
      .then((studentGroups) => {
        const data = ['This is the list of our students'];

        const arrange = (a, b) => {
          if (a[0].toLowerCase() < b[0].toLowerCase()) return -1;
          if (a[0].toLowerCase() > b[0].toLowerCase()) return 1;
          return 0;
        };

        for (const [field, students] of Object.entries(studentGroups).sort(arrange)) {
          data.push(`Number of students in ${field}: ${students.length}. List: ${students.map((student) => student.firstname).join(', ')}`);
        }
        response.status(200).send(data.join('\n'));
      })
      .catch((error) => {
        response.status(500).send(error instanceof Error ? error.message : error.toString());
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    if (!MAJORS.includes(major)) {
      response.status(500).send('Major parameter must be CS or SWE');
    } else {
      readDatabase(dataPath)
        .then((studentGroups) => {
          let data = '';

          if (studentGroups[major]) {
            data = `List: ${studentGroups[major].map((student) => student.firstname).join(', ')}`;
          }
          response.status(200).send(data);
        })
        .catch((error) => {
          response.status(500).send(error instanceof Error ? error.message : error.toString());
        });
    }
  }
}

export default StudentsController;
module.exports = StudentsController;
