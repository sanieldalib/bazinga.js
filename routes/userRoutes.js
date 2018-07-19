const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const refresh = require('passport-oauth2-refresh');
const axios = require('axios');
const { google } = require('googleapis');

module.exports = router => {
	router.post('/users', (req, res) => {
		// res.send('You entered: ' + req.body.user);
		const newUser = new User({ name: req.body.user });
		console.log(newUser);
		newUser.save();
	});

	router.post('/getcal', (req, res) => {
		var ids = [];
		const id = req.body.userid;
		User.findOne({ googleID: id }, (err, user) => {
			if (!user) {
				res.send({
					message: 'You are not an authenticated user. Please sign in.'
				});
				return;
			} else {
				refresh.requestNewAccessToken(
					'google',
					user.refreshToken,
					(err, accessToken, refreshToken) => {
						if (err) {
							console.log(err);
						} else {
							console.log(accessToken);
							axios
								.get(
									'https://www.googleapis.com/calendar/v3/users/me/calendarList',
									{
										params: {
											access_token: accessToken
										}
									}
								)
								.then(response => {
									response.data.items.forEach(item => {
										ids.push(item.id);
									});
									user.set({ calendars: ids });
									user.save(err => {
										if (err) {
											console.log(err);
										}
									});
									res.send({ ids: ids });
									return;
								})
								.catch(err => {
									console.log(err);
								});
						}
					}
				);
			}
		});
	});

	router.post('/setcal', (req, res) => {
		const id = req.body.userid;
		const calendar = req.body.calendar;
		User.findOne({ googleID: id }, (err, user) => {
			if (!user) {
				res.send({
					message: 'You are not an authenticated user. Please sign in.'
				});
				return;
			} else {
				if (!user.calendars.includes(calendar, 0)) {
					res.send({
						message: calendar + ' is not a valid calendar.'
					});
					return;
				}
				user.set({ calendar: calendar });
				user.save(err => {
					if (err) {
						res.send({
							message: 'An error occurred.'
						});
					} else {
						res.send({
							message: calendar + ' is now the default calendar'
						});
					}
				});
			}
		});
	});
};
