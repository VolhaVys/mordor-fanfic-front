export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const loginAction = (token, user) => ({ type: LOGIN, token, user });
export const logoutAction = () => ({ type: LOGOUT });
