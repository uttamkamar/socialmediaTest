const User = require('../models/user');

//module.exports. profile <-------- here .profile is just a name you could choose any name
module.exports.profile = function (req, res) {
	// res.end('<h1>user profile is loaded</h1>');
	return res.render('user_profile', {
		title: 'user profile',
		userBody: 'user profile page',
	});
};

//render the signup page
module.exports.signUp = function (req, res) {
	if (req.isAuthenticated()) {
		return res.redirect('/users/profile');
	}
	return res.render('user_sign_up', {
		title: 'Codeial | SignUp',
	});
};

//render the signin page
module.exports.signIn = function (req, res) {
	if (req.isAuthenticated()) {
		return res.redirect('/users/profile');
	}
	return res.render('user_sign_in', {
		title: 'Codeial | SignIn',
	});
};

//get signup data
module.exports.create = function (req, res) {
	if (req.body.password != req.body.confirm_password) {
		return res.redirect('back');
	}
	User.findOne({ email: req.body.email }, function (err, user) {
		if (err) {
			console.log('error in finding user in signing up');
			return;
		}
		if (!user) {
			User.create(req.body, function (err, user) {
				if (err) {
					console.log('error in creating user while signing up');
					return;
				}

				return res.redirect('/users/sign-in');
			});
		} else {
			return res.redirect('back');
		}
	});
};

//signin and create a session for the user
module.exports.createSession = function (req, res) {
	return res.redirect('/');
};

//signout and destroy the session
module.exports.destroySession = function (req, res) {
	req.logout(function (err) {
		if (err) {
			console.log('error in logout or detroing session');
		}
	});
	return res.redirect('/');
};
