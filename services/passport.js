const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('/keys');
const mongoose = require('mongoose');

const User = mongoose.model('user');
