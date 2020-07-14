import json
from flask import Flask, Response, request
from flask_cors import CORS
import server.data.db as db
from server.data.exceptions import *
from server.auth.jwt import *

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


@app.route('/signin', methods=['GET', 'POST'])
def login_user():
    data = request.get_json()["data"]
    try:
        user = db.get_user(data[EMAIL], data[PASSWORD])
        user_jwt = get_encoded_jwt(data[EMAIL], data[PASSWORD])
        user.pop('match_ups')
        response = Response(json.dumps(dict(jwt=user_jwt.decode(), user=user)), 200)
    except Error:
        response = Response(json.dumps(SignInFailed().__dict__), 400)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route('/matchups', methods=['GET', 'POST'])
def post_match_ups():
    """
    post all match ups for user
    """
    try:
        user = get_user_by_auth(request.headers['Authorization'])
        match_ups = db.get_all_match_ups(user[EMAIL])
        serializable_match_ups = []
        for match_up in match_ups:
            serializable_match_ups.append(match_up.dict())
        response = Response(json.dumps(serializable_match_ups), 200)
    except Error as e:
        response = Response(json.dumps(e.__dict__), 400)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route('/gameinput', methods=['GET', 'POST'])
def add_game():
    """
    add a game's data to db
    """
    game = request.get_json()["data"]
    try:
        user = get_user_by_auth(request.headers['Authorization'])
        db.add_game(user[EMAIL], game[USER_CHAR], game[OPPONENT], game[OPPONENT_CHAR],
                    game[STAGE], game[WIN], game[USER_STOCK], game[OPPONENT_STOCK])
        response = Response(200)
    except Error as e:
        response = Response(json.dumps(e.__dict__), 400)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


if __name__ == "__main__":
    app.run()
