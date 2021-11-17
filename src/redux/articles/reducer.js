import {SET_ARTICLES, SET_LOADING} from './constan';

const initialState = {
  articles: [],
  loading: false,
};

const ArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return {...state, articles: action.data};
    case SET_LOADING:
      return {...state, loading: action.data};
    default:
      return state;
  }
};

export default ArticlesReducer;
