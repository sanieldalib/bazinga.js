const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
	eventID: String,
	title: String,
	start: Date,
	end: Date,
	guests: [String],
	room: String,
	description: String,
	owner: String
});

mongoose.model('event', eventSchema);

module.exports = {
	Bazinga: '5medl82be281pbrltc69ffs3qs@group.calendar.google.com',
	BeamMeUpScotty: 'lke3uvc3m6tho94l6o9cg1ha8s@group.calendar.google.com',
	BookEmDanno: 'oqllj775cp76s5uf86cufm15rg@group.calendar.google.com',
	DynOMite: 'frb9fagpqfgm6n5mmhgku3p1qg@group.calendar.google.com',
	LegenWaitForItDary: 'so9b42ju2msi1tkl1mf2t2dhlc@group.calendar.google.com',
	LucyIAmHome: 'mfbhr6m587anuue2lvviisnbvg@group.calendar.google.com',
	Norm: '0l9f41mfunpr3terurol9vkuoc@group.calendar.google.com',
	TheTribeHasSpoken: '86kmigejpvge4alehecjb1m0fg@group.calendar.google.com',
	ExpectTheUnexpected: 'v51rp5nsq1fhr0jle8tffrgleg@group.calendar.google.com',
	LiveLongAndProsper: 'cv4u4jo2bkobiqhu0vvk9ovaog@group.calendar.google.com',
	MarciaMarciaMarcia: 'dje3vgqv68e3dn18gdeajurh5k@group.calendar.google.com'
};
