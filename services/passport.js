const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../keys');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const refresh = require('passport-oauth2-refresh');
// const { google } = require('googleapis');

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

const googlePassport = new GoogleStrategy(
	{
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/callback'
	},
	async (accessToken, refreshToken, params, profile, done) => {
		const existingUser = await User.findOne({ googleID: profile.id });
		if (existingUser) {
			console.log(existingUser.googleID);
			done(null, existingUser);
			console.log(accessToken);
		} else {
			console.log(profile);
			console.log(refreshToken);
			console.log(accessToken);
			const user = await new User({
				googleID: profile.id,
				name: profile.displayName,
				accessToken: accessToken,
				refreshToken: refreshToken,
				refreshDate: params.expires_in
			}).save();
			console.log('Saved user', user.name);
			done(null, user);
		}
	}
);

passport.use(googlePassport);
refresh.use(googlePassport);
