import json
from flask import Flask, Response, request
from flask_cors import CORS
import data.db as db
from constants.constants import *
from data.exceptions import *
from auth.jwt import *

app = Flask(__name__)
CORS(app)


@app.route('/signup', methods=['GET', 'POST'])
def set_user_data():
    data = request.get_json()["data"]
    try:
        db.add_user(data[F_NAME], data[L_NAME], data[EMAIL], data[PASSWORD], data[TAG], data[MAIN])
        response = Response('', 204)
    except Error as e:
        response = Response(json.dumps(e.__dict__), 400)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route('/signin', methods=['POST'])
def login_user():
    data = request.get_json()["data"]
    try:
        user = db.get_user(data[EMAIL], data[PASSWORD])
        user_jwt = get_encoded_jwt(data[EMAIL], data[PASSWORD])
        response = Response(json.dumps(dict(jwt=user_jwt.decode(), user=data[EMAIL])), 200)
    except Error:
        response = Response(json.dumps(SignInFailed().__dict__), 400)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route('/matchups')
@app.route('/matchups/<user>')
def post_match_ups(user=None):
    """
    post all match ups for user 'user'
    example url extension: '/matchups/atamargo@ufl.edu'
    """
    try:
        check_valid_auth(request.headers['Authorization'], user)
        match_ups = db.get_all_match_ups(user)
        serializable_match_ups = []
        for match_up in match_ups:
            serializable_match_ups.append(match_up.dict())
        response = Response(json.dumps(serializable_match_ups), 200)
    except Error as e:
        response = Response(json.dumps(e.__dict__), 400)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


if __name__ == "__main__":
    app.run()
