// return token from session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
};

// return user from session storage
export const getUser = () => {
    return sessionStorage.getItem('user') || null;
};

// set the token and user from teh session storage
export const setUserSession = (jwt, user) => {
    console.log(`in setUserSessions: ${jwt}, ${user}`);
    sessionStorage.setItem('token', jwt);
    sessionStorage.setItem('user', user);
};

