const initialState = {
    practiceVideos: [],
  };
  
  const GET_VIDEOS = "GET_VIDEOS";
  const ADD_VIDEO = "ADD_VIDEO";
  const DELETE_VIDEO = "DELETE_VIDEO";
  const LOGOUT_VIDEOS = "LOGOUT_VIDEOS"
  
  export function getVideos(payload) {
    return {
      type: GET_VIDEOS,
      payload: payload,
    };
  }
  
  export function addVideo(payload) {
    return {
      type: ADD_VIDEO,
      payload: payload,
    };
  }

  export function deleteVideo(payload) {
      return {
          type: DELETE_VIDEO,
          payload: payload
      }
  }

  export function logoutVideos() {
    return {
      type: LOGOUT_VIDEOS,
      payload: initialState,
    };
  }
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case GET_VIDEOS:
        return {
          ...state,
          practiceVideos: action.payload,
        };
      case ADD_VIDEO:
        return {
          ...state,
          practiceVideos: action.payload,
        };
      case DELETE_VIDEO:
        return {
          ...state,
          practiceVideos: action.payload,
        };
      case LOGOUT_VIDEOS:
        return initialState;
      default:
        return state;
    }
  }
  