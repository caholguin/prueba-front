import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import authSaga from './sagas/authSaga';
import { productReducer } from './reducers/productReducer';
import { productSaga } from './sagas/productSaga';
import { all } from 'redux-saga/effects';


const sagaMiddleware = createSagaMiddleware();


const rootReducer = combineReducers({
  auth: authReducer,
  productState: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;


function* rootSaga() {
  yield all([authSaga(), productSaga()]);
}


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), 
});


export type AppDispatch = typeof store.dispatch;


sagaMiddleware.run(rootSaga);

export default store;
