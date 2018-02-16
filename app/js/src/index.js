import 'bootstrap/dist/css/bootstrap.min.css';
import { queryBetterDoctor } from './../api/query.betterdoctor.js';

$(document).ready(function () {

	/* * * * * * * * * * * FORM SUBMIT * * * * * * * * * * */
	$("#better-doctor-query").submit(function (event) {
		event.preventDefault();
		let doctor_name = $("#doctor-name").val();
		let medical_issue = $("#medical-issue").val();
		let query = queryBetterDoctor(doctor_name, medical_issue);

		query.then(function (response) {
			let body = JSON.parse(response);

			Object.keys(body.data).forEach(function (key) {
				let profile = body.data[key].profile;
				let first_name = body.data[key].profile.first_name;
				let last_name = body.data[key].profile.last_name;
				console.log(`${last_name}, ${first_name}`);
			});

			/*

			let address
			let phone number
			let website
			let accepting new patients
			*/

			//for
			// for (i = 0; i < body.length);
			//each

		}, function (error) {
			$('.showErrors').text(`There was an error processing your request: ${error.message}`);
		});
	});
});
