import json
from flask import Flask, Response, request
from flask_cors import CORS
import data.db as db
from constants.constants import *
from helpers import games_to_match_ups
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


@app.route('/signin', methods=['GET', 'POST'])
def login_user():
    data = request.get_json()["data"]
    try:
        user = db.get_user_by_login(data[EMAIL], data[PASSWORD])
        user_jwt = get_encoded_jwt(data[EMAIL], data[PASSWORD])
        response = Response(json.dumps(dict(jwt=user_jwt.decode(), user=user.__dict__)), 200)
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
        games = db.get_all_games(user.get_id())
        match_ups = games_to_match_ups(games, user)
        response = Response(json.dumps(match_ups), 200)
    except Error as e:
        response = Response(json.dumps(e.__dict__), 400)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route('/games', methods=['GET', 'POST'])
def post_games():
    """
    post all match ups for user
    """
    try:
        user = get_user_by_auth(request.headers['Authorization'])
        games = db.get_all_games(user.get_id())
        serializable_games = []
        for game in games:
            serializable_games.append(game.dict())
        response = Response(json.dumps(serializable_games), 200)
    except Error as e:
        response = Response(json.dumps(e.__dict__), 400)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route('/opponents', methods=['GET', 'POST'])
def post_opponents():
    """
    post all past opponents for user
    """
    try:
        user = get_user_by_auth(request.headers['Authorization'])
        opponents = db.get_all_past_opponents(user.get_id())
        response = Response(json.dumps(opponents), 200)
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
        db.add_game(user.get_id(), game[USER_CHAR], game[OPPONENT], game[OPPONENT_CHAR],
                    game[STAGE], game[WIN], game[USER_STOCK], game[OPPONENT_STOCK])
        response = Response('', 200)
    except Error as e:
        response = Response(json.dumps(e.__dict__), 400)
    except AssertionError as e:
        response = Response('', 400)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


if __name__ == "__main__":
    app.run()
