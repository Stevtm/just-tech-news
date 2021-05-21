const express = require("express");
const path = require("path");
const session = require("express-session");
const exphbs = require("express-handlebars");

const helpers = require("./utils/helpers");

// initialize app
const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// set up sessions
const sess = {
	secret: "super secret secret",
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));

// require express-handlebars
const hbs = exphbs.create({ helpers });

// set up express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// set up express handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(require("./controllers/"));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log("Now listening"));
});
