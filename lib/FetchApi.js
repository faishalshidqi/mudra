import axios from "axios"
import CookieHandler from "./CookieHandler";

class FetchApi {
	static getAccessToken() {
		const refreshToken = CookieHandler.getToken()
		const request = {
			refreshToken: refreshToken
		}
		return fetch(`${process.env.API_URL}/kll/authentications`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(request)
		})
			.then(response => {
				return response.json()
			})
			.then(responseJson => {
				if (responseJson.data) {
					return Promise.resolve(responseJson.data)
				}
				return Promise.reject(responseJson.message)
			})
	}
	static getDashboard(token) {
		return fetch(`${process.env.API_URL}/kll/dashboard`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			}
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

	static getAllCourses(token) {
		return fetch(`${process.env.API_URL}/kll/courses`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			}
		})
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

	static getCoursesInfo(token) {
		return fetch(`${process.env.API_URL}/kll/courses/info`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			}
		})
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

	static getCoursesById({token, id}) {
		return fetch(`${process.env.API_URL}/kll/courses/${id}`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			}
		})
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

	static getAllChallenges(token) {
		return fetch(`${process.env.API_URL}/kll/challenges`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			}
		})
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

	static getChallengeById({token, id}) {
		return fetch(`${process.env.API_URL}/kll/challenges/${id}`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			}
		})
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

	static addNewCourse(request, token) {
		return fetch(`${process.env.API_URL}/kll/courses`, {
			method: "POST",
			headers: {
				'Authorization': `Bearer ${token}`,
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

	static addNewChallenge(request, token) {
		return fetch(`${process.env.API_URL}/kll/challenges`, {
			method: "POST",
			headers: {
				'Authorization': `Bearer ${token}`,
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

	static editCourseById(id, request, token) {
		return fetch(`${process.env.API_URL}/kll/courses/${id}`, {
			method: "PUT",
			headers: {
				'Authorization': `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(request.body)
		})
			.then(response => {
				return response.json()
			})
			.then(responseJson => {
				if (responseJson.status === "success") {
					return Promise.resolve(responseJson)
				}
				else {
					return Promise.reject("Caught error at course edit.")
				}
			})
	}

	static editChallengeById(id, request, token) {
		return fetch(`${process.env.API_URL}/kll/challenges/${id}`, {
			method: "PUT",
			headers: {
				'Authorization': `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(request.body)
		})
			.then(response => {
				return response.json()
			})
			.then(responseJson => {
				if (responseJson.status === "success") {
					return Promise.resolve(responseJson)
				}
				else {
					return Promise.reject("Caught error at challenge edit.")
				}
			})
	}

	static deleteCourse(id, token) {
		return fetch(`${process.env.API_URL}/kll/courses/${id}`, {
			method: "DELETE",
			headers: {
				'Authorization': `Bearer ${token}`,
				"Content-Type": "application/json"
			},
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

	static deleteChallenge(id, token) {
		return fetch(`${process.env.API_URL}/kll/challenges/${id}`, {
			method: "DELETE",
			headers: {
				'Authorization': `Bearer ${token}`,
				"Content-Type": "application/json"
			},
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
		return axios.post(`${process.env.UPLOAD_URL}/upload`, request.file, {
			headers: {"Content-Type": "multipart/form-data"}
		})
			.then((response) => {
				return response.data
			})
			.catch(e => {
				return e
			})
	}

	static userLogin(request) {
		return fetch(`${process.env.API_URL}/kll/authentications`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(request)
		})
			.then(response => {
				return response.json()
			})
			.then(responseJson => {
				if (responseJson.data) {
					return responseJson.data
				}
				return responseJson.message
			})
	}
}

export default FetchApi
