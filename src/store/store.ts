import { configureStore } from '@reduxjs/toolkit'
import authReducer  from './auth/authSlice';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './auth/sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer ,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
