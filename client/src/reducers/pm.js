import {
  GET_PMS,
  ADD_PM,
  PM_ERROR,
  DELETE_PM,
  GET_PM,
  UPDATE_PM
  } from '../actions/types';
  
  const initialState = {
    pms: [],
    pm: null,
    loading: true,
    error: {}
  };
  
  function cardReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_PMS:
        return {
          ...state,
          pms: payload,
          loading: false
        };
      case GET_PM:
        return {
          ...state,
          pm: payload,
          loading: false
        };
      case ADD_PM:
        return {
          ...state,
          pms: [payload, ...state.pms],
          loading: false
        };
        case UPDATE_PM:
        return {
          ...state,
          loading: false
        };
      case DELETE_PM:
        return {
          ...state,
          pms: state.pms.filter((pm) => pm._id !== payload),
          loading: false
        };
      case PM_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
   
      default:
        return state;
    }
  }
  
  export default cardReducer;
  