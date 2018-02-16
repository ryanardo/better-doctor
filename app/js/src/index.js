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
			console.log('SEARCH Clicked');

			Object.keys(body.data).forEach(function (key_profile) {
				/* PROFILE */
				let profile = body.data[key_profile].profile;
				let first_name = body.data[key_profile].profile.first_name;
				let last_name = body.data[key_profile].profile.last_name;
				console.log(`${last_name}, ${first_name}`);
				/* PRACTICES */
				Object.keys(body.data[key_profile].practices).forEach(function (key_practice) {
					//Address
					let address_street = body.data[key_profile].practices[key_practice].visit_address.street;
					let address_city = body.data[key_profile].practices[key_practice].visit_address.city;
					let address_state = body.data[key_profile].practices[key_practice].visit_address.state;
					let address_state_long = body.data[key_profile].practices[key_practice].visit_address.state_long;
					let address_zip = body.data[key_profile].practices[key_practice].visit_address.zip;
					console.log(`${address_street}, ${address_city}, ${address_state_long} ${address_zip}`);
					//Accepting new patients
					let patients = body.data[key_profile].practices[key_practice].accepts_new_patients;
					console.log(`Accepting new patients: ${patients}`);
					//Website
					let website = body.data[key_profile].practices[key_practice].website;
					console.log(`Website: ${website}`);
					/* PHONE */
					Object.keys(body.data[key_profile].practices[key_practice].phones).forEach(function (key_phone) {
						let phone_type = body.data[key_profile].practices[key_practice].phones[key_phone].type;
						let phone_number = body.data[key_profile].practices[key_practice].phones[key_phone].number;
						console.log(`${phone_type}: ${phone_number}`);
					});
				});
			});

		}, function (error) {
			$('.showErrors').text(`There was an error processing your request: ${error.message}`);
		});
	});
});
