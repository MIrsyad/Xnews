import {
  SET_ISLOGIN,
  SET_LOADING,
  SET_DATA,
  ISLOGIN,
  ISSUCCESS,
  SET_ISSUCCESS,
  SET_USER,
  REMOVE_USER,
  REMOVE_DATA,
} from './constan';

const initialState = {
  data: [],
  user: [],
  isLogin: false,
  isSuccess: '',
  loading: false,
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ISLOGIN:
      const {isLogin} = state;
      return {...state, isLogin};
    case ISSUCCESS:
      const {isSuccess} = state;
      return {...state, isSuccess};
    case SET_LOADING:
      return {...state, loading: action.data};
    case SET_ISLOGIN:
      return {...state, isLogin: action.data};
    case SET_ISSUCCESS:
      return {...state, isSuccess: action.data};
    case SET_DATA:
      return {...state, data: action.data};
    case SET_USER:
      return {...state, user: action.data};
    case REMOVE_DATA:
      return {...state, data: []};
    case REMOVE_USER:
      return {...state, user: []};
    default:
      return state;
  }
};

export default globalReducer;
