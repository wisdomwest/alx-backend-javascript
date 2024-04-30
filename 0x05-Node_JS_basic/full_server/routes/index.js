import express from 'express';
import AppController from '../controllers/AppController';
import studentsController from '../controllers/StudentsController';

const routes = express.Router();

routes.get('/', AppController.getHomePage);
routes.get('/students', studentsController.getAllStudents);
routes.get('/students/:major', studentsController.getAllStudentsByMajor);

export default routes;
