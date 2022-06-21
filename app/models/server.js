const express = require('express');

/* libs */
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
      uploads: '/api/uploads',
      users: '/api/users',
      cart: '/api/cart',
      order: '/api/order',
    };

    // Connect to db
    this.connectToDB();

    // Middlewares
    this.middlewares();

    // my app routes
    this.routes();
  }

  async connectToDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // read and parse the body
    this.app.use(express.json());

    // public directory
    this.app.use(express.static('public'));

    // file upload
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.routes'));

    this.app.use(
      this.paths.categories,
      require('../routes/categories.routes')
    );

    this.app.use(
      this.paths.products,
      require('../routes/products.routes')
    );

    this.app.use(
      this.paths.uploads,
      require('../routes/uploads.routes')
    );

    this.app.use(this.paths.search, require('../routes/search.routes'));
    this.app.use(this.paths.users, require('../routes/user.routes'));
    this.app.use(this.paths.cart, require('../routes/cart.routes'));
    this.app.use(this.paths.order, require('../routes/order.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        '/** 🚀 Listening in port ',
        this.port,
        ' **/'
      );
    });
  }
}

module.exports = Server;
