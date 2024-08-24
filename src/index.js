// **WEBINAR-CODE* 5-2
// import { initMongoConnection } from './db/initMongoConnection.js';
// import { startServer } from './server.js';

// (async () => {
//   await initMongoConnection();
//   startServer();
// })();

// **WEBINAR-CODE* 6

// import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { TEMP_UPLOAD_DIR } from './constants/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { startServer } from './server.js';
import { createFolderIfDoesNotExist } from './utils/createDirIfNotExists.js';

(async () => {
  await initMongoConnection();
  await createFolderIfDoesNotExist(TEMP_UPLOAD_DIR);
  // await createFolderIfDoesNotExist(UPLOAD_DIR);
  startServer();
})();
