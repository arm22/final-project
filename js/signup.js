"use strict";

$(function(){
	$('.form-signup').submit(function(evt){
			evt.preventDefault();

			var user = new Parse.User();
			user.set('id', $('#inputID').val());
			user.set('zip-code', $('#inputZipcode').val());

			user.signUp().then(function(){
				clearError();
				window.location = 'index.html';
			}, function(err){
				showError(err);
			});

	});
});