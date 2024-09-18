export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export interface LoginRequestPayload {
  username: string;
  password: string;
  navigate: (path: string) => void; // Añadimos navigate aquí
}

export const loginRequest = (payload: { username: string; password: string }, navigate: (path: string) => void) => ({
  type: LOGIN_REQUEST,
  payload: { ...payload, navigate },
});

export const loginSuccess = (token: string) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logoutRequest = () => ({  
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});
