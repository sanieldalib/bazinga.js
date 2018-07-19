const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Event = mongoose.model('event');
const userModel = require('../model/user');
const eventModel = require('../model/event');
const refresh = require('passport-oauth2-refresh');
const axios = require('axios');
const { google } = require('googleapis');
const uniqid = require('uniqid');

module.exports = router => {
	router.post('/status', (req, res) => {
		var now = new Date();
		now.setHours(now.getHours());
		var later = new Date(now.getTime() + 10 * 60000);
		console.log(now);
		console.log(later);
		const room = req.body.room;
		var roomCal = '';

		switch (room) {
			case 'Bazinga':
				roomCal = eventModel.Bazinga;
				break;
			case 'BeamMeUpScotty':
				roomCal = eventModel.BeamMeUpScotty;
			case 'BookEmDanno':
				roomCal = eventModel.BookEmDanno;
			case 'DynOMite':
				roomCal = eventModel.DynOMite;
			case 'LegenWaitForItDary':
				roomCal = eventModel.LegenWaitForItDary;
			case 'LucyIAmHome':
				roomCal = eventModel.LucyIAmHome;
			case 'Norm':
				roomCal = eventModel.Norm;
			case 'TheTribeHasSpoken':
				roomCal = eventModel.TheTribeHasSpoken;
			case 'ExpectTheUnexpected':
				roomCal = eventModel.ExpectTheUnexpected;
			case 'LiveLongAndProsper':
				roomCal = eventModel.LiveLongAndProsper;
			case 'MarciaMarciaMarcia':
				roomCal = eventModel.MarciaMarciaMarcia;
			default:
				break;
		}

		const id = '105658417773708889598';
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
								.post(
									'https://www.googleapis.com/calendar/v3/freeBusy',
									{
										timeMin: now.toISOString(),
										timeMax: later.toISOString(),
										timeZone: 'UTC',
										items: [{ id: roomCal }]
									},
									{
										headers: {
											Authorization: 'Bearer ' + accessToken,
											'Content-Type': 'application/json'
										}
									}
								)
								.then(response => {
									console.log(response.data.calendars[roomCal]);
									if (response.data.calendars[roomCal].busy.length < 1) {
										res.send('empty');
									} else {
										res.send('full');
									}
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
};
