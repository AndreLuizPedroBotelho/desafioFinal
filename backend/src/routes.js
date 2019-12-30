import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController';
import AnswerController from './app/controllers/AnswerController';
import UserController from './app/controllers/UserController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

/**
 * Session
 */
routes.post('/session', SessionController.store);

/**
 * Middlewares
 */
routes.use(authMiddlewares);

/**
 * User
 */
routes.get('/users', UserController.index);

/**
 * Student
 */
routes.post('/student', StudentController.store);
routes.put('/student/:id', StudentController.update);
routes.get('/student/:id', StudentController.show);
routes.get('/student', StudentController.index);
routes.delete('/student/:id', StudentController.delete);

/**
 * Checkins
 */
routes.post('/students/:studentId/checkins', CheckinController.store);
routes.get('/students/:studentId/checkins', CheckinController.index);

/**
 * HelpOrders
 */
routes.get('/students/help-orders/dont-answer', HelpOrderController.index);

/**
 * StudentHelpOrders
 */
routes.post(
  '/students/:studentId/help-orders',
  StudentHelpOrderController.store
);
routes.get(
  '/students/:studentId/help-orders',
  StudentHelpOrderController.index
);

/**
 * Answer
 */
routes.put('/help-orders/:helpOrdersId/answer', AnswerController.update);

/**
 * Plans
 */
routes.put('/plans/:planId', PlanController.update);
routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.get('/plans/:planId', PlanController.show);
routes.delete('/plans/:planId', PlanController.delete);

/**
 * Registration
 */
routes.put('/registrations/:registrationId', RegistrationController.update);
routes.post('/registrations', RegistrationController.store);
routes.get('/registrations', RegistrationController.index);
routes.delete('/registrations/:registrationId', RegistrationController.delete);

export default routes;
