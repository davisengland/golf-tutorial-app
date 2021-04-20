import { Update } from "massive";

const initialState = {
  user: {},
};

const SIGNUP = "SIGNUP";
const LOGIN = "LOGIN";
const GET_USER = "GET_USER";
const LOGOUT = "LOGOUT";
const UPDATE_INFO = "UPDATE_INFO";

export function signup(payload) {
  return {
    type: SIGNUP,
    payload: payload,
  };
}

export function login(payload) {
  return {
    type: LOGIN,
    payload: payload,
  };
}

export function getUser(payload) {
  return {
    type: GET_USER,
    payload: payload,
  };
}

export function logout() {
  return {
    type: LOGOUT,
    payload: initialState,
  };
}

export function update(payload) {
  return {
    type: UPDATE_INFO,
    payload: payload
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN:
      return {
        user: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return initialState;
    case UPDATE_INFO:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
}
