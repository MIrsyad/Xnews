import axios from 'axios';

import {SET_ARTICLES, SET_LOADING, SET_PRODUCT} from './constan';

export const setLoading = data => {
  return {type: SET_LOADING, data};
};

export const setArticles = data => {
  return {type: SET_ARTICLES, data};
};

const apiString = `https://gist.githubusercontent.com/sahlannasution/6002191892e40044c6c2c8662c907e9d/raw/d634dd0ce6c1179b19a57523fca860e1c665f9cd/getAllArticlesGuest.json`;
export const getArticles = () => dispatch => {
  dispatch(setLoading(true));
  axios
    .get(apiString)
    .then(res => {
      // console.log(res.data.data.getAllArticles);
      dispatch(setArticles(res.data.data.getAllArticles));
    })
    .catch(e => {
      console.log(e);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};
