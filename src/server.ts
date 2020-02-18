import dotenv from 'dotenv';
import app from './app';
import MongoConnection from './mongo-connection';
import PgConnection from './pg-connection';
import logger from './logger';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.default' });
}

logger.log({
  level: 'debug',
  message: process.env.POSTGRES_HOST
});
// const mongoConnection = new MongoConnection(process.env.MONGO_URL);

export const pgConnection = new PgConnection({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT)
});

if (process.env.POSTGRES_HOST == null) {
  logger.log({
    level: 'error',
    message: 'POSTGRES_HOST not specified in environment'
  });
  process.exit(1);
} else {
  // mongoConnection.connect(() => { console.log('connect'); });
  pgConnection.singleQuery({
    name: 'DB-TIME',
    text: 'SELECT NOW()',
    values: []
  })
    .then((con) => {
      app.listen(app.get('port'), () => {
        console.log(con.rows[0], `🌏 Express server started at http://localhost:${app.get('port')}`);
        if (process.env.NODE_ENV === 'development') {
        console.log('\x1b[36m%s\x1b[0m', // eslint-disable-line
            `⚙️  Swagger UI hosted at http://localhost:${app.get('port')}/dev/api-docs`);
        }
      });
    })
    .catch((err) => {
      console.log(err, 'FAIL TO START EXPRESS SERVER');
    });
}

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  logger.info('Gracefully shutting down');
  // mongoConnection.close((err) => {
  //   if (err) {
  //     logger.log({
  //       level: 'error',
  //       message: 'Error shutting closing mongo connection',
  //       error: err
  //     });
  //   }
  //   process.exit(0);
  // });
  pgConnection.end().then(
    (rst) => {
      logger.info('DB Connection end');
    }
  ).catch(
    (err) => {
      logger.error('FAIL to end db connection'.concat(err.message));
    }
  );
});
