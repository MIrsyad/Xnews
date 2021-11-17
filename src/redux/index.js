import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

import authReducer from './auth/reducer';
import articlesReducer from './articles/reducer';

const persistConfig = {
  key: 'Xnews',
  storage: AsyncStorage,
  blacklist: ['articles'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articlesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleware),
);

export const persistor = persistStore(store);

export default {};
