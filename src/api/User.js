import axios from 'axios'

export default class User {
    static async login (email, password) {
        let token
        await axios.post(process.env.VUE_APP_API_URL + 'auth/login', {
            email: email,
            password: password,
        }).then(function (response) {
           token = response.data.access_token;
        }).catch(function () {
            throw new Error('authorization failed');
        })

        return token
    }

    static async registration (email, password, name) {
        await axios.post(process.env.VUE_APP_API_URL + 'auth/registration', {
            email: email,
            password: password,
            name: name,
        }).catch(function () {
            throw new Error('registration failed');
        })
    }
}