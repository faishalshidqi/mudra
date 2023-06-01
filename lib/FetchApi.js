import axios from "axios";

class FetchApi {
	static coursesId = [];
	static getDashboard() {
		return fetch(`${process.env.API_URL}/kll/dashboard`)
			.then(response => {
				return response.json()
			})
			.then(responseJson => {
				if (responseJson.data) {
					return Promise.resolve(responseJson.data)
				}
				else {
					return Promise.reject("Caught error at dashboard.")
				}
			})
	}

	static getAllCourses() {
		return fetch(`${process.env.API_URL}/kll/courses`)
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				if (responseJson.data) {
					this.storeCourseId(responseJson.data)
					return Promise.resolve(responseJson.data);
				}
				else {
					return Promise.reject('Caught error at dashboard.');
				}
			});
	}

	static storeCourseId({ courses }) {
		courses.map((course) => {
			this.coursesId.push(course.course_id);
		})
	}

	static getCoursesId() {
		return this.coursesId;
	}

	static getCoursesById(id) {
		return fetch(`${process.env.API_URL}/courses/${id}`)
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				if (responseJson.data) {
					return Promise.resolve(responseJson.data);
				}
				else {
					return Promise.reject('Caught error at dashboard.');
				}
			});
	}

	static getAllChallenges() {
		return fetch(`${process.env.API_URL}/kll/challenges`)
			.then(response => {
				return response.json()
			})
			.then(responseJson => {
				if (responseJson.data) {
					return Promise.resolve(responseJson.data)
				}
				else {
					return Promise.reject("Caught error at dashboard.")
				}
			})
	}

	static postCourse(request) {
		return fetch(`${process.env.API_URL}/kll/courses`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(request.body)
		})
			.then(response => {
				return response.json()
			})
			.then(responseJson => {
				if (responseJson.data) {
					return Promise.resolve(responseJson.data)
				}
				else {
					return Promise.reject("Caught error at dashboard.")
				}
			})
	}

	static deleteCourse(id) {
		return fetch(`${process.env.API_URL}/kll/courses/${id}`, {
			method: "DELETE"
		})
			.then(response => {
				return response.json()
			})
			.then(responseJson => {
				if (responseJson.status === 'success') {
					return Promise.resolve(responseJson)
				}
				else {
					return Promise.reject("Caught error at dashboard.")
				}
			})
	}

	static uploadImage(request) {
		return axios({
			method: 'POST',
			url: `${process.env.API_URL}/upload`,
			data: request.file,
			headers: {"Content-Type": "multipart/form-data"}
		})
				.then((response) => {
					response.json();
				})
				.then((responseJson) => {
					console.log(responseJson)
				})
				.catch(e => {
					console.log(e);
				})
		// return fetch(`${process.env.UPLOAD_URL}/upload`, {
		// 	method: "POST",
		// 	body: request.file
		// })
		// 	.then((response) => response.json())
		// 	.then((responseJson) => {
		// 		console.log(responseJson)
		// 		if (responseJson.url) {
		// 			return Promise.resolve(responseJson);
		// 		} else {
		// 			return Promise.reject(responseJson);
		// 		}
		// 	});
	}
}

export default FetchApi
