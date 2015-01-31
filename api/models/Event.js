/**
* Schedule.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
  	date: { 
  		type: 'datetime',
		  unique: true,
  	},

  	text: {
  		type: 'string',
  		required: true
  	},

  },

  beforeCreate: function(values, next) {
  	var dateString = values.eventDate + ' ' + values.eventTime;
  	values.date = new Date(dateString.replace(/-/g, "/"));
  	next();
  }
};

