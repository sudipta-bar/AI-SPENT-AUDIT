import { app } from './server.js';
import { connectToDatabase } from './config/db.js';

const port = process.env.PORT || 5000;

Promise.resolve(connectToDatabase()).finally(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
