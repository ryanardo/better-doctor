const api_key = require('./../../../.env').apiKey;

export let queryBetterDoctor = function (doctor_name, medical_issue) {
	return new Promise(function (resolve, reject) {
		let request = new XMLHttpRequest();
		let location = "45.5231%2C-122.6765%2C100";
		let user_location = "45.5231%2C-122.6765";

		let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctor_name}&query=${medical_issue}&location=${location}&user_location=${user_location}&skip=0&user_key=${api_key}`
		request.onload = function () {
			if (this.status === 200) {
				resolve(request.response);
			} else {
				reject(Error(request.statusText));
			}
		}
		request.open("GET", url, true);
		request.send();
	});
};
