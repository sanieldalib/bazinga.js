const mongoose = require('mongoose');
const refresh = require('passport-oauth2-refresh');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleID: String,
	name: String,
	calendar: String,
	calendars: [String],
	accessToken: String,
	refreshToken: String,
	refreshDate: Date
});

mongoose.model('user', userSchema);
