import jwt
from data.db import get_user
from data.exceptions import Error, InvalidAuth
from constants.constants import *

SECRET_KEY = 'MY_SECRET_KEY_HERE'


def get_encoded_jwt(email, password):
    return jwt.encode({'email': email, 'password': password}, SECRET_KEY, algorithm='HS256')


def check_valid_auth(auth: str, user: str):
    """
    Decode jwt payload
    Verify that user requested is user on payload
    Check that user with email and pass on payload exists

    :param auth: Authorization header `Bearer ${jwt}`
    :param user: user email
    """
    a = auth.split("Bearer ", 1)[1]
    payload = jwt.decode(a, SECRET_KEY, algorithm='HS256')
    try:
        u = get_user(payload[EMAIL], payload[PASSWORD])
        if payload[EMAIL] != user:
            raise Error
    except Error:
        raise InvalidAuth
    return


