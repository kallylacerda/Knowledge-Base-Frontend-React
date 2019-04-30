import { TOGGLE_MENU, SET_USER } from './actions';
import axios from 'axios';

const initialState = {
    isMenuVisible: false,
    user: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MENU: {
            let newState = state

            if (!newState.user) {
                newState.isMenuVisible = false
                return { ...newState }
            }

            if (action.isVisible === undefined) {
                newState.isMenuVisible = !newState.isMenuVisible
                return { ...newState }
            } else {
                newState.isMenuVisible = action.isVisible
                return { ...newState }
            }
        }
        case SET_USER: {
            let newState = state
            newState.user = action.user
            if (action.user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${action.user.token}`
                newState.isMenuVisible = true
                return { ...newState }
            } else {
                delete axios.defaults.headers.common['Authorization']
                newState.isMenuVisible = false
                return { ...newState }
            }
        }

        default: return { ...state };
    }
}