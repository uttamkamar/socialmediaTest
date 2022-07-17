module.exports.home = function (req, res) {
	// return res.end('<h1>Express is up for codeial!</h1>');
	console.log(req.cookies);
	res.cookie('user_id', 30);
	return res.render('home', {
		title: 'home page',
		homeBody: 'homePageBody',
	});
};
