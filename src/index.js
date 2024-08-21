// **WEBINAR-CODE* 5-2
import { initMongoConnection } from './db/initMongoConnection.js';
import { startServer } from './server.js';

(async () => {
  await initMongoConnection();
  startServer();
})();
