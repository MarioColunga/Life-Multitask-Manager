const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const sequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
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
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);

app.use(
  session({
    secret: "dirtySecret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
      db: sequelize,
    }),
  })
);
app.use(routes);

// Connect to database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
