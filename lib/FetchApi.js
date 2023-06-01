import axios from "axios"

class FetchApi {
	static coursesId = []
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

	static getCoursesId() {
		return this.getAllCourses()
				.then((data) => {
					return data
				})
				.then(({courses}) => {
					const coursesId = [];
					courses.forEach(({course_id}) => {
						coursesId.push(course_id)
					})
					return coursesId
				})
	}

	static getCoursesById(id) {
		return fetch(`${process.env.API_URL}/kll/courses/${id}`)
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
				if (responseJson.status === "success") {
					return Promise.resolve(responseJson)
				}
				else {
					return Promise.reject("Caught error at dashboard.")
				}
			})
	}

	static uploadImage(request) {
		return axios({
			method: "POST",
			url: `${process.env.UPLOAD_URL_DEPLOYED}/upload`,
			data: request.file,
			headers: {"Content-Type": "multipart/form-data"}
		})
			.then((response) => {
				return response.data;
			})
			.catch(e => {
				return e;
			})
	}
}

export default FetchApi
