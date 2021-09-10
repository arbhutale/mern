import api from '../utils/api';
import { setAlert } from './alert';
import { push } from "connected-react-router";
import {
  GET_CARDS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  ADD_CARD,
  CARD_ERROR
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


// // Delete post
// export const deletePost = id => async dispatch => {
//   try {
      
//     await api.delete(`/posts/${id}`);

//     dispatch({
//       type: DELETE_POST,
//       payload: id
//     });

//     dispatch(setAlert('Post Removed', 'success'));
//   } catch (err) {
//     dispatch({
//       type: CARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

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

// Get post
// export const getPost = id => async dispatch => {
//   try {
//     const res = await api.get(`/posts/${id}`);

//     dispatch({
//       type: GET_POST,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: POST_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };



