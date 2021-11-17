import axios from 'axios';

import {
  SET_DATA,
  SET_ISLOGIN,
  SET_LOADING,
  ISLOGIN,
  SET_ISSUCCESS,
  ISSUCCESS,
  SET_USER,
  REMOVE_DATA,
  REMOVE_USER,
} from './constan';

export const isLogin = () => {
  return {type: ISLOGIN};
};

export const isSuccess = () => {
  return {type: ISSUCCESS};
};

export const setList = data => {
  return {type: SET_DATA, data};
};

export const setLoading = data => {
  return {type: SET_LOADING, data};
};

export const setIsLogin = data => {
  return {type: SET_ISLOGIN, data};
};

export const setIsSuccess = data => {
  return {type: SET_ISSUCCESS, data};
};

export const setUser = data => {
  return {type: SET_USER, data};
};

export const removeData = data => {
  return {type: REMOVE_DATA, data};
};

export const removeUser = data => {
  return {type: REMOVE_USER, data};
};

export const Login = (email = '', password = '') => dispatch => {
  dispatch(setLoading(true));
  dispatch(setIsSuccess(''));
  axios
    .post(`https://xnews-graphql-playground.herokuapp.com/login`, {
      email: email,
      password: password,
    })
    .then(response => {
      dispatch(setList(response.data));
      console.log(response.data);
      dispatch(setIsLogin(true));
      dispatch(setIsSuccess('Authenticated'));
    })
    .catch(error => {
      console.log(error);
      dispatch(setIsSuccess('Login Failed'));
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const Register = (name = '', email = '', password = '') => dispatch => {
  dispatch(setLoading(true));
  axios
    .post(`https://xnews-graphql-playground.herokuapp.com/register`, {
      email: email,
      fullname: name,
      password: password,
    })
    .then(response => {
      dispatch(setList(response.data));
      console.log(response.data);
      dispatch(setIsSuccess(response.data.status));
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};
