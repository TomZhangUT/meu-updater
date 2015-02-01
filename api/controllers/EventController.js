/**
 * ScheduleController
 *
 * @description :: Server-side logic for managing schedules
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	demo: function(req, res, next){
		Event.find({sort: 'date ASC'}, function foundEvents (err, events){
			if (err) return next(err);
			
			res.view({
				events: events,	
			})
		})
	},

	create: function (req, res, next) {
		Event.create(req.params.all(), function eventCreated(err, event){
			if (err) {
				return next(err);
			}

			var schedule = require('node-schedule');
			var date = event.date;
			 
			var j = schedule.scheduleJob(date, function(){

			    User.find(function foundUsers (err, users){
					if (err) return next(err);
					
					var registration_ids = users.map(function extractRegistrationID(item){
						var id = item.registration_id.replace(/['"]+/g, '');
						return id;
					});

					if (registration_ids.length > 0){
						var data = {
							"data": {
								"text" : event.text,
							},
							"registration_ids": registration_ids
						};
						
						GCM.sendData('/gcm/send', 'POST', data, function(data){
							console.log(JSON.stringify(data));
						})
					}else{
						console.log("No Users");
					}
					
				});
			});

			res.redirect('/event/demo');
		});
	},

	destroy: function (req, res, next){
		Event.findOne(req.param('id'), function foundEvent (err, event){
			if (err) return next(err);

			if (!event) return next('Bus doesn\'t exists.');

			Event.destroy(req.param('id'), function eventDestroyed(err){
				if (err) return next (err);
			});

			res.send(200);
		});
	},

	send: function (req, res, next){

		User.find(function foundUsers (err, users){
			if (err) return next(err);
			
			var registration_ids = users.map(function extractRegistrationID(item){
				var id = item.registration_id.replace(/['"]+/g, '');
				return id;
			});

			if (registration_ids.length > 0){
				var data = {
					"data": {
						"text" : "Kawaii in the Streets, Sitanpai in the Sheets",
					},
					"registration_ids": registration_ids
				};
				
				GCM.sendData('/gcm/send', 'POST', data, function(data){
					console.log(JSON.stringify(data));
				})
			}else{
				console.log("No Users");
			}
			
		});


		res.redirect('/event/demo');
	},

	broadcast: function (req, res, next){
		var message = req.param('message');
		
		User.find(function foundUsers (err, users){
			if (err) return next(err);
			
			var registration_ids = users.map(function extractRegistrationID(item){
				var id = item.registration_id.replace(/['"]+/g, '');
				console.log(id);
				return id;
			});

			if (registration_ids.length > 0){
				var data = {
					"data": {
						"text" : message,
					},
					"registration_ids": registration_ids
				};
				
				GCM.sendData('/gcm/send', 'POST', data, function(data){
					console.log(JSON.stringify(data));
				})
			}else{
				console.log("No Users");
			}
			
		});


		res.redirect('/event/demo');
	}
};

