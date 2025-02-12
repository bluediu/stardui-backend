import dotenv from 'dotenv';
import { Server } from './presentation';
import { MongoDatabase } from './config';

dotenv.config();

const server = new Server();

async function main() {
  await MongoDatabase.connect(process.env.MONGO_CNN);

  server.listen();
}

(() => {
  main();
})();

export const viteNodeApp = server.app;
