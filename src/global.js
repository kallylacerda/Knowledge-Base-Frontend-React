import { defaultSuccess, defaultError } from './config/msgs';

export const baseApiUrl = 'https://simple-knowledge-base-backend.herokuapp.com/'
export const userKey = '__knowledge_user'

export function showError(e) {
    if (e && e.response && e.response.data) {
        defaultError({ msg: e.response.data })
    } else if (typeof e === 'string') {
        defaultError({ msg: e })
    } else {
        defaultError({})
    }
}

export function showSuccess(e) {
    if (e && e.response && e.response.data) {
        defaultSuccess({ msg: e.response.data })
    } else if (typeof e === 'string') {
        defaultSuccess({ msg: e })
    } else {
        defaultSuccess({})
    }
}

export default { baseApiUrl, showError, userKey }