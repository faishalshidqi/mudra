
class FetchApi {
    static coursesId = [];
    static getDashboard() {
        return fetch(`${process.env.API_URL}/kll/dashboard`)
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

    static postCourse(request) {
        return fetch(`${process.env.API_URL}/kll/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request.body)
        })
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
}

export default FetchApi;
