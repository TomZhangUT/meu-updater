/**
 * ScheduleController
 *
 * @description :: Server-side logic for managing schedules
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res, next){
		Event.find({sort: 'date ASC'}, function foundEvents (err, events){
			if (err) return next(err);
			
			res.view("homepage", {
				events: events,	
			})
		})
	},

	create: function (req, res, next) {
		Event.create(req.params.all(), function eventCreated(err, bus){
			if (err) {
				return next(err);
			}
			res.redirect('/event/index');
		});
	},

	edit: function (req, res, next){
		Event.findOne(req.param('id'), function foundEvent(err, event){
			if (err) return next(err);
			if (!event) return next();

			res.view({
				event: event,
			});
		});
	},

	destroy: function (req, res, next){
		Event.findOne(req.param('id'), function foundEvent (err, event){
			if (err) return next(err);

			if (!event) return next('Bus doesn\'t exists.');

			Event.destroy(req.param('id'), function eventDestroyed(err){
				if (err) return next (err);
			});

			res.redirect('/event/index');
		});
	},

	send: function (req, res, next){

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


		res.redirect('/event/index');
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


		res.redirect('/event/index');
	}
};

