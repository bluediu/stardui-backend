const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = '/api/users';

    // Middlewares
    this.middlewares();

    // my app routes
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // read and parse the body
    this.app.use(express.json());

    // public directory
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.userPath, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Listening in port ', this.port);
    });
  }
}

module.exports = Server;
