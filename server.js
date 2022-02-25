const express = require('express');

const sequelize = require('./config/connection');

const Book = require('./Profile');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect to database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
}); 