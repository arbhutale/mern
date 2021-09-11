import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_PMS,
  ADD_PM,
  PM_ERROR,
  DELETE_PM,
  GET_PM,
  UPDATE_PM
} from './types';

// Get posts
export const getPms = () => async dispatch => {
  try {
    const res = await api.get('/pms')

    dispatch({
      type: GET_PMS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Delete Crda
export const deletePm = id => async dispatch => {
  try {
    await api.delete(`/pms/${id}`);
    dispatch({
      type: DELETE_PM,
      payload: id
    });

    dispatch(setAlert('Card Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add card
export const addPm = formData => async dispatch => {
  try {
    const res = await api.post('/pms', formData)
    dispatch({
      type: ADD_PM,
      payload: res.data
    });

    dispatch(setAlert('Card Created', 'success'));
    
  } catch (err) {
    dispatch({
      type: PM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
  
};



// Add card
export const updatePm = (formData, id) => async dispatch => {
  try {
    const res = await api.put(`/pms/${id}`, formData)
    dispatch({
      type: UPDATE_PM,
      payload: res.data
    });

    dispatch(setAlert('Card Updated', 'success'));
    
  } catch (err) {
    dispatch({
      type: PM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
  
};

// Get Card
export const getPm = id => async dispatch => {
  try {
    const res = await api.get(`/pms/${id}`);

    dispatch({
      type: GET_PM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};



