// return token from session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
};

// return user from session storage
export const getUser = () => {
    return JSON.parse(sessionStorage.getItem('user')) || null;
};

// set the token and user from teh session storage
export const setUserSession = (jwt, user) => {
    sessionStorage.setItem('token', jwt);
    sessionStorage.setItem('user', JSON.stringify(user));
};

// remove token and user from local storage
export const endUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
};

