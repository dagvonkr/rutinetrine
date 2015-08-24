var mongoose = require('mongoose');

var rutineSchema = mongoose.Schema({
	description: {
		title: {type: String, required: true},
		description: {type: String}
	},
	assignment: {
		assigned_to: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // vil endre seg til å hente fra database etterhvert
		assigned_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'} // ref User refereres ett sted her, husk det
	},
	date: {
		date_start: {type: Date, default: Date.now()},
		date_end: {type: Date, default: null} // her må jeg legge inn dato for slutt. Ikke helt sikker på hvordan det gjøres
	},
	status: {
		active: {type: Boolean, default: true}
	}
});

module.exports = mongoose.model('Rutine', rutineSchema);
