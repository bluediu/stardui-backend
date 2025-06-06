import './config/env.js';

import { Server } from './presentation/index.js';
import { MongoDatabase } from './config/index.js';

const server = new Server();

async function main() {
  await MongoDatabase.connect(process.env.MONGO_CNN);

  server.listen();
}

main();

// export const viteNodeApp = server.app;
