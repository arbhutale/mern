import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_CARDS,
  ADD_CARD,
  CARD_ERROR,
  DELETE_CARD,
  GET_CARD,
  UPDATE_CARD
} from './types';

// Get posts
export const getCards = () => async dispatch => {
  try {
    const res = await api.get('/cards')

    dispatch({
      type: GET_CARDS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Delete Crda
export const deleteCard = id => async dispatch => {
  try {
    await api.delete(`/cards/${id}`);
    dispatch({
      type: DELETE_CARD,
      payload: id
    });

    dispatch(setAlert('Card Removed', 'success'));
  } catch (err) {
    dispatch({
      type: CARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add card
export const addCard = formData => async dispatch => {
    console.log(formData.form)
  try {
    const res = await api.post('/cards', formData.form)
    dispatch({
      type: ADD_CARD,
      payload: res.data
    });

    dispatch(setAlert('Card Created', 'success'));
    
  } catch (err) {
      console.log(err)
    dispatch({
      type: CARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
  
};



// Add card
export const updateCard = (formData, id) => async dispatch => {
    console.log(formData)
  try {
    const res = await api.put(`/cards/${id}`, formData)
    dispatch({
      type: UPDATE_CARD,
      payload: res.data
    });

    dispatch(setAlert('Card Updated', 'success'));
    
  } catch (err) {
      console.log(err)
    dispatch({
      type: CARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
  
};

// Get Card
export const getCard = id => async dispatch => {
  try {
    const res = await api.get(`/cards/${id}`);

    dispatch({
      type: GET_CARD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};



