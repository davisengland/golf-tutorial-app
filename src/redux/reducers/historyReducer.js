const initialState = {
  history: [],
};

const GET_HISTORY = "GET_HISTORY";
const ADD_TO_HISTORY = "ADD_TO_HISTORY";

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
    default:
      return state;
  }
}
