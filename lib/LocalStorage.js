class LocalStorage {
    static checkAvailability() {
        if (typeof(localStorage) === "undefined") {
            return new Error('Local storage not supported')
        }
    }

    static addToken(token) {
        this.checkAvailability()

        localStorage.setItem('refreshToken', token)
    }

    static getToken() {
        this.checkAvailability()

        return localStorage.getItem('refreshToken');
    }

    static deleteToken() {
        this.checkAvailability()

        localStorage.removeItem('refreshToken')
    }

}

export  default LocalStorage