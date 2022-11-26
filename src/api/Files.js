import axios from 'axios'

export default class Files {
    static async getList(parentId = null) {
        let directory
        await axios.get(process.env.VUE_APP_API_URL + 'cloud' + (parentId ? '?directory_id=' + parentId : ''), {
            headers: { Authorization: 'Bearer ' + localStorage.token }
        }).then(function (response) {
            directory = response.data.data
        }).catch(function () {
            throw new Error('something wrong');
        })

        return directory
    }

    static async createDirectory(name, parentId) {
        await axios.post(process.env.VUE_APP_API_URL + 'cloud/create/directory', {name: name, parent_id: parentId}, {
            headers: { Authorization: 'Bearer ' + localStorage.token }
        }).then(function (response) {
            console.log(response);
        }).catch(function () {
            throw new Error('something wrong');
        })
    }

    static async createFile(name, parentId, file) {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('parent_id', parentId);
        formData.append('file', file);

        await axios.post(process.env.VUE_APP_API_URL + 'cloud/create/file', formData, {
            headers: { Authorization: 'Bearer ' + localStorage.token }
        }).then(function (response) {
            console.log(response);
        }).catch(function () {
            throw new Error('something wrong');
        })
    }
}