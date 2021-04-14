const initialState = {
  history: [],
};

const GET_HISTORY = "GET_HISTORY";
const ADD_TO_HISTORY = "ADD_TO_HISTORY";
const LOGOUT_HISTORY = "LOGOUT_HISTORY"

export function getHistory(payload) {
  return {
    type: GET_HISTORY,
    payload: payload,
  };
}

export function addToHistory(payload) {
  return {
    type: ADD_TO_HISTORY,
    payload: payload,
  };
}

export function logoutHistory() {
  return {
    type: LOGOUT_HISTORY,
    payload: initialState,
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    case ADD_TO_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    case LOGOUT_HISTORY:
      return initialState;
    default:
      return state;
  }
}
