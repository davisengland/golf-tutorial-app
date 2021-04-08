const initialState = {
    tutorials: []
}

const GET_TUTORIALS = 'GET_TUTORIALS'
const GET_TUTORIAL = 'GET_TUTORIAL'
const ADD_TUTORIAL = 'ADD_TUTORIAL'

export function getTutorials(payload) {
    console.log(payload, 'payload')
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
    console.log(action)
    switch(action.type) {
        case GET_TUTORIALS:
            return {
                ...state,
                tutorials: action.payload
            }
        case GET_TUTORIAL:
            return {
                ...state,
                tutorials: action.payload
            }
        case ADD_TUTORIAL:
            return {
                ...state,
                tutorials: action.payload
            }
        default: return state
    }
}