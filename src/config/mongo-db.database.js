import mongoose from 'mongoose';

export class MongoDatabase {
  static async connect(connectionString) {
    try {
      await mongoose.connect(connectionString);
      console.log('**==== Mongo connected 🛢️  ====**');
    } catch (error) {
      console.log('Mongo connection error ❌');
      throw error;
    }
  }
}
