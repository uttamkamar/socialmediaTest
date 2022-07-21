const Post = require('../models/post');

module.exports.home = function (req, res) {
	// return res.end('<h1>Express is up for codeial!</h1>');
	// console.log(req.cookies);
	// res.cookie('user_id', 30);

	// Post.find({}, function (err, posts) {
	// 	return res.render('home', {
	// 		title: 'Codeial | Home',
	// 		homeBody: 'homePageBody',
	// 		posts: posts,
	// 	});
	// });

	//populate the user of each post
	Post.find({})
		.populate('user')
		.populate({
			path: 'comments',
			populate: {
				path: 'user',
			},
		})
		.exec(function (err, posts) {
			return res.render('home', {
				title: 'Codeial | Home',
				homeBody: 'homePageBody',
				posts: posts,
			});
		});
};
