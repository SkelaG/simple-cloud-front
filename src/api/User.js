import axios from 'axios'

export default class User {
    static async login(email, password) {
        await axios.post(process.env.VUE_APP_API_URL + 'auth/login', {
            email: email,
            password: password,
        }).then(function (response) {
            localStorage.token = response.data.access_token;
            localStorage.rootDirectory = response.data.data.rootDirectoryId
        }).catch(function () {
            throw new Error('authorization failed');
        })
    }

    static async registration(email, password, name) {
        await axios.post(process.env.VUE_APP_API_URL + 'auth/registration', {
            email: email,
            password: password,
            name: name,
        }).catch(function () {
            throw new Error('registration failed');
        })
    }

    static async me ()
    {
        await axios.post(process.env.VUE_APP_API_URL + 'auth/me', {}, {headers: {Authorization: 'Bearer ' + localStorage.token}}).catch(function () {
            throw new Error('unautentificated');
        })
    }

    static async refresh ()
    {
        await axios.post(process.env.VUE_APP_API_URL + 'auth/refresh', {}, {headers: {Authorization: 'Bearer ' + localStorage.token}}).then(function (response) {
            localStorage.token = response.data.access_token;
        }).catch(function () {
            throw new Error('authorization failed');
        })
    }

    static async logout ()
    {
        await axios.post(process.env.VUE_APP_API_URL + 'auth/logout', {}, {headers: {Authorization: 'Bearer ' + localStorage.token}}).catch(function () {
            throw new Error('unautentificated');
        })
        localStorage.token = null;
        localStorage.rootDirectory = null;
    }
}