/* Core */
import cors from 'cors';
import express from 'express';

/* Libs */
import fileUpload from 'express-fileupload';

/* Routes */
import {
  authRoutes,
  userRoutes,
  categoryRoutes,
  productRoutes,
} from '../routes/index.js';

const API = '/api';

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.paths = {
      auth: `${API}/auth`,
      categories: `${API}/categories`,
      products: `${API}/products`,
      search: `${API}/search`,
      uploads: `${API}/uploads`,
      users: `${API}/users`,
      cart: `${API}/cart`,
    };

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static('public'));

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.users, userRoutes);
    this.app.use(this.paths.categories, categoryRoutes);
    this.app.use(this.paths.products, productRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('**==== 🚀 Listening in port ', this.port, ' ====**');
    });
  }
}
