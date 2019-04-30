export const TOGGLE_MENU = 'TOGGLE_MENU'
export const SET_USER = 'SET_USER'

export const toggleMenu = () => ({ type: TOGGLE_MENU })
export const setUser = (user) => ({ type: SET_USER, user })