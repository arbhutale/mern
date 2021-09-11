import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import card from './card';
import pm from './pm';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  card,
  pm
});
