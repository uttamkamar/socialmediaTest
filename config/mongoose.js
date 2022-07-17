const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to Mongo DB'));

db.once('open', function () {
	console.log('connected to database :: MongoDB');
});

module.exports = db;
