const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// app.use(express.urlencoded);
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static('./assets'));

//we need to use it before routs because we tell the routs to follow some sort of a layout
app.use(expressLayouts);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express routes
app.use('/', require('./routes/index'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, (err) => {
	if (err) {
		console.log(`error in running the server: ${err}`);
	}
	console.log(`Your app is running on port ${port}!`);
});
