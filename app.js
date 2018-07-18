const express = require('express');
const app = express();
const mongoose = require('mongoose');
const keys = require('./keys');
const passport = require('passport');
const router = express.Router();

mongoose.connect(
	keys.mongo,
	() => {
		console.log('Connected to Mongo!');
	}
);

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
	res.send('<h1>Bazinga.js</h1>');
});

app.use('/api', router);

router.get('/', (req, res) => {
	res.send('welcome to api!');
});

app.listen(PORT, () => {
	console.log('Server on port:', PORT);
});
