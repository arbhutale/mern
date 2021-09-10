import {
    GET_CARDS,
    DELETE_POST,
    GET_POST,
    ADD_CARD,
    CARD_ERROR
  } from '../actions/types';
  
  const initialState = {
    cards: [],
    card: null,
    loading: true,
    error: {}
  };
  
  function cardReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_CARDS:
        return {
          ...state,
          cards: payload,
          loading: false
        };
      case GET_POST:
        return {
          ...state,
          card: payload,
          loading: false
        };
      case ADD_CARD:
        return {
          ...state,
          cards: [payload, ...state.cards],
          loading: false
        };
      case DELETE_POST:
        return {
          ...state,
          cards: state.posts.filter((post) => post._id !== payload),
          loading: false
        };
      case CARD_ERROR:
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
  