// Imports and requisites.
const express = require("express");
const session = require("express-session"); 
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const allRoutes = require("./controllers")

// Sequelize things.
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Requiring models for synching.
const { User, Comment} = require("./models")

// Session.
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
      maxAge:1000*60*60*2
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
      db: sequelize
  })
};
app.use(session(sess));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Sets up the Express app to use handlebars.
app.engine('handlebars',hbs.engine);
app.set("view engine","handlebars");

// Static directory
app.use(express.static("public"));

app.use(allRoutes);
app.get("/sessions", (req,res) => {
    res.json(req.session)
});

// Synch the database and start the server!
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("App is up and listening on PORT " + PORT);
  });
});
