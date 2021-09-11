import {
    GET_CARDS,
    DELETE_CARD,
    GET_POST,
    ADD_CARD,
    CARD_ERROR,
    GET_CARD,
    UPDATE_CARD
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
      case GET_CARD:
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
        case UPDATE_CARD:
        return {
          ...state,
          loading: false
        };
      case DELETE_CARD:
        return {
          ...state,
          cards: state.cards.filter((card) => card._id !== payload),
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
  