export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const loginAction = (token) => ({ type: LOGIN, token });
export const logoutAction = () => ({ type: LOGOUT });
