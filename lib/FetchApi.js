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
					return Promise.reject("Caught error at course list")
				}
			})
	}

	static getCoursesInfo() {
		return fetch(`${process.env.API_URL}/kll/courses/info`)
			.then(response => {
				return response.json()
			})
			.then(responseJson => {
				if (responseJson.data) {
					return Promise.resolve(responseJson.data)
				}
				else {
					return Promise.reject("Caught error at course info")
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
					return Promise.reject("Caught error at course detail.")
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
					return Promise.reject("Caught error at challenge list.")
				}
			})
	}

	static getChallengesId() {
		return this.getAllChallenges()
			.then((data) => {
				return data
			})
			.then(({challenges}) => {
				const challengesId = [];
				challenges.forEach(({challenge_id}) => {
					challengesId.push(challenge_id)
				})
				return challengesId
			})
	}

	static getChallengeById(id) {
		return fetch(`${process.env.API_URL}/kll/challenges/${id}`)
			.then(response => {
				return response.json()
			})
			.then(responseJson => {
				if (responseJson.data) {
					return Promise.resolve(responseJson.data)
				}
				else {
					return Promise.reject("Caught error at challenge detail.")
				}
			})
	}

	static addNewCourse(request) {
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
					return Promise.reject("Caught error at new course addition.")
				}
			})
	}

	static addNewChallenge(request) {
		return fetch(`${process.env.API_URL}/kll/challenges`, {
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
					return Promise.reject("Caught error at new challenge addition.")
				}
			})
	}

	static editCourseById(id, request) {
		return fetch(`${process.env.API_URL}/kll/courses/${id}`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(request.body)
		})
			.then(response => {
				return response.json()
			})
			.then(responseJson => {
				if (responseJson.status === 'success') {
					return Promise.resolve(responseJson)
				}
				else {
					return Promise.reject("Caught error at course edit.")
				}
			})
	}

	static editChallengeById(id, request) {
		return fetch(`${process.env.API_URL}/kll/challenges/${id}`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(request.body)
		})
			.then(response => {
				return response.json()
			})
			.then(responseJson => {
				if (responseJson.status === 'success') {
					return Promise.resolve(responseJson)
				}
				else {
					return Promise.reject("Caught error at challenge edit.")
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
					return Promise.reject("Caught error at course deletion.")
				}
			})
	}

	static deleteChallenge(id) {
		return fetch(`${process.env.API_URL}/kll/challenges/${id}`, {
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
					return Promise.reject("Caught error at challenge deletion.")
				}
			})
	}

	static uploadCourseImage(request) {
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
