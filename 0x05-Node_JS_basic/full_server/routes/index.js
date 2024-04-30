import AppController from "../controllers/AppController";
import studentsController from "../controllers/StudentsController";

const routes = (app) => {
  app.get('/', AppController.getHomePage);
  app.get('/students', studentsController.getAllStudents);
  app.get('/students/:major', studentsController.getAllStudentsByMajor);
};

export default routes;
module.exports = routes;
