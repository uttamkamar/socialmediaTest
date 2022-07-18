const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

// app.use(express.urlencoded);
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static('./assets'));

//we need to use it before routs because we tell the routs to follow some sort of a layout
app.use(expressLayouts);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store session cookie in the DB
app.use(
	session({
		name: 'codeial',
		//TODO change the secrate before deployment in production mode
		secret: 'blahsomething',
		//when the user is not logged in or identity is not establish inthat case we dont need to save extra data in
		//session cookie so this is set to false
		saveUninitialized: false,
		//if the session data is alredy stored we dont need to rewrite it again and again so this is set to false
		resave: false,
		cookie: {
			maxAge: 1000 * 60 * 100,
		},
		//connect-mongo is used here.  It store the session cookie permanently
		store: MongoStore.create(
			{
				mongoUrl: 'mongodb://localhost/codeial_development',

				// mongoUrl: 'process.mongoose.db',
				autoRemove: 'disabled',
			},
			function (err) {
				console.log(err || 'connect-mongodb setup ok');
			}
		),
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express routes
app.use('/', require('./routes/index'));

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, (err) => {
	if (err) {
		console.log(`error in running the server: ${err}`);
	}
	console.log(`Your app is running on port ${port}!`);
});
