const express = require('express');
const bodyParser = require('body-parser');

const preflightRoute = require('./routes/preflight');
const userRoute = require('./routes/user');
const appointmentRoute = require('./routes/appointment');
const errorRoute = require('./routes/error');

const acessControl = require('../utils/acessControl');
const validateRequestBody = require('../utils/validateRequestBody');
const authentication = require('../utils/authentication');

const api = express();
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

module.exports = (services) => {
  const preflight = preflightRoute.create();
  const user = userRoute.create(services);
  const appointment = appointmentRoute.create(services);

  api.use(acessControl);
  api.use('*', preflight);

  api.use(validateRequestBody);

  api.use('/api/users', authentication.verify, user);
  api.use('/api/appointments', appointment);

  api.use(errorRoute);
  return api;
};