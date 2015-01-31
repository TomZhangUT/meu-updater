/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res, next){

		User.find(function foundUsers (err, users){
			if (err) return next(err);
			
			res.view({
				users: users,	
			})
			
		})
	},
};

