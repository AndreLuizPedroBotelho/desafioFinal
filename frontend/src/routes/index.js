import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';

/**
 * HelpRequest
 */
import HelpRequest from '../pages/HelpRequest';

/**
 * Student
 */
import Student from '../pages/Student';
import StudentCreate from '../pages/Student/StudentCreate';

/**
 * Plan
 */
import Plan from '../pages/Plan';
import PlanCreate from '../pages/Plan/PlanCreate';

/**
 * Register
 */
import Register from '../pages/Register';
import RegisterCreate from '../pages/Register/RegisterCreate';

import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/helpRequest" exact component={HelpRequest} isPrivate />

      <Route path="/student" exact component={Student} isPrivate />
      <Route path="/student/save/:id?" component={StudentCreate} isPrivate />

      <Route path="/plan" exact component={Plan} isPrivate />
      <Route path="/plan/save/:id?" component={PlanCreate} isPrivate />

      <Route path="/register" exact component={Register} isPrivate />
      <Route path="/register/save/:id?" component={RegisterCreate} isPrivate />
    </Switch>
  );
}
