const logger = require('./libs/logger');
const config = require('./configuration');
const db = require('./database');
const repositories = require('./repositories')(db);
const services = require('./services')(repositories);
const api = require('./http/api/api')(services);
const web = require('./http/web/web')(services);
const signals = require('./signals');
const sampleData = require('./sampleData')(services);

const apiServer = api.listen(config.api.port, () => {
  logger.info(`Listening on *:${config.api.port}`);
});

const webServer = web.listen(config.web.port, () => {
  logger.info(`Listening on *:${config.web.port}`);
});

if (process.env.NODE_ENV === 'develop') {
  db.dropDatabase();
  sampleData.create();
}

const shutdown = signals.init(async () => {
  await db.close();
  await apiServer.close();
  await webServer.close();
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
