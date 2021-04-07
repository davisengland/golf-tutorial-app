const initialState = {
    tutorials: []
}

const GET_TUTORIALS = 'GET_TUTORIALS'
const GET_TUTORIAL = 'GET_TUTORIAL'
const ADD_TUTORIAL = 'ADD_TUTORIAL'

export function getTutorials(payload) {
    return {
        type: GET_TUTORIALS,
        payload: payload
    }
}

export function getTutorial(payload) {
    return {
        type: GET_TUTORIAL,
        payload: payload
    }
}

export function addTutorial(payload) {
    return {
        type: ADD_TUTORIAL,
        payload: payload
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_TUTORIALS:
            return {
                ...state,
                user: action.payload
            }
        case GET_TUTORIAL:
            return {
                ...state,
                user: action.payload
            }
        case ADD_TUTORIAL:
            return {
                ...state,
                user: action.payload
            }
        default: return state
    }
}