const express = require('express');
const bodyParser = require('body-parser');

const authentication = require('./utils/authentication');
const validateRequestBody = require('./utils/validateRequestBody');

const userRoute = require('./routes/user');
const appointmentRoute = require('./routes/appointment');
const errorRoute = require('./routes/error');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = (services) => {
  const user = userRoute.create(services);
  const appointment = appointmentRoute.create(services);

  app.use(authentication.verify);
  app.use(validateRequestBody);

  app.use('/users', user);
  app.use('/appointments', appointment);

  // app.use(authentication.sign);

  app.use(errorRoute);
  return app;
};
