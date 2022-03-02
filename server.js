const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./routes");
const sequelize = require("./config/connection");
// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create();
const app = express();
const PORT = process.env.PORT || 3001;
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// http://localhost:3001/js/login.js

app.use(routes);

// Connect to database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
