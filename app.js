const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userModel = require('./model/user');
const eventModel = require('./model/event');
const keys = require('./keys');
const passport = require('passport');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const authRoutes = require('./routes/authRoutes');
const statusRoutes = require('./routes/statusRoutes');
const router = express.Router();
// const { google } = require('googleapis');

require('./services/passport');

module.exports = router;

mongoose.connect(keys.mongolocal);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log('Connected to Mongo!');
});

console.log(keys.mongo);

// authorize();

const PORT = process.env.PORT || 8080;

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/', (req, res) => {
	res.send('<h1>Bazinga.js</h1>');
});

app.use('/api', router);

userRoutes(router);
statusRoutes(router);
calendarRoutes(router);
authRoutes(app);

router.get('/', (req, res) => {
	res.json({ welcome: 'API is up!' });
});

app.listen(PORT, () => {
	console.log('Server on port:', PORT);
});
