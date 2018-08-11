const express = require('express');
const bodyParser = require('body-parser');

const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');
const appointmentRoute = require('./routes/appointment');
const weekRoute = require('./routes/week');
const dayRoute = require('./routes/day');
const errorRoute = require('./routes/error');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = services => {
  const login = loginRoute.create(services);
  const user = userRoute.create(services);
  const appointment = appointmentRoute.create(services);
  const week = weekRoute.create(services);
  const day = dayRoute.create(services);

  app.use('/login', login);
  app.use('/users', user);
  app.use('/appointments', appointment);
  app.use('/weeks', week);
  app.use('/days', day);
  app.use(errorRoute);
  return app;
};
