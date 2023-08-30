import Cookies from 'js-cookie'

class CookieHandler {

    static addToken(token) {
        Cookies.set('refreshToken', token)
    }

    static getToken() {
        try {
            const token = Cookies.get('refreshToken');
            return token || false;
        } catch (error) {
            console.error('Error accessing Cookie:', error);
            return false;
        }
    }

    static deleteToken() {
        Cookies.remove('refreshToken');
    }
}

export default CookieHandler;
