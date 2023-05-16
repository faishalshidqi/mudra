class FetchApi {
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
                    return Promise.reject('Caught error at dashboard.')
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
                    return Promise.reject('Caught error at dashboard.')
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
                    return Promise.reject('Caught error at dashboard.')
                }
            })
    }

    //todo create fetch API to challenges endpoint (not yet created)
}

export default FetchApi
