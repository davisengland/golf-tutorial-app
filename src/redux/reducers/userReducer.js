const initialState = {
    user: {}
}

const SIGNUP = 'SIGNUP'
const LOGIN = 'LOGIN'
const GET_USER = 'GET_USER'
const LOGOUT = 'LOGOUT'

export function signup(payload) {
    return {
        type: SIGNUP,
        payload: payload
    }
}

export function login(payload) {
    console.log(payload)
    return {
        type: LOGIN,
        payload: payload
    }
}

export function getUser(payload) {
    return {
        type: GET_USER,
        payload: payload
    }
}

export function logout() {
    return {
        type: LOGOUT,
        payload: initialState
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SIGNUP:
            return {
                ...state,
                user: action.payload
            }
        case LOGIN:
            return {
                user: action.payload
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
        case LOGOUT: return initialState
        default: return state
    }
}