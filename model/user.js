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

// module.exports = function getAccess(refreshToken) {
// 	refresh.requestNewAccessToken(
// 		'google',
// 		refreshToken,
// 		(err, accessToken, refreshToken) => {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				return { newAccess: accessToken, newRefresh: refreshToken };
// 			}
// 		}
// 	);
// };

mongoose.model('user', userSchema);
