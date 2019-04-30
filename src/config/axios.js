import axios from 'axios';

function success(res) { return res }

function error(err) {
    if (401 === err.response.status) {
        window.location = '/auth'
    } else {
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error)