const passport = require('passport');
const { google } = require('googleapis');

//exports auth routes
module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
			accessType: 'offline',
			prompt: 'consent'
		})
	);

	app.get(
		'/auth/callback',
		passport.authenticate('google', { failureRedirect: '/auth/google' }),
		function(req, res) {
			// Successful authentication, redirect home.
			res.redirect('/');
		}
	);
};
