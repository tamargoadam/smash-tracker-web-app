from pymongo import MongoClient
from models.user import User
from models.game import Game
from models.playermatch import PlayerMatch
from data.exceptions import *
from constants.constants import *
import random
import re

cluster = MongoClient(
    'mongodb+srv://tamargoadam:Blackacre1@cluster0-kahtq.mongodb.net/test?retryWrites=true&w=majority')
db = cluster["melee"]
users_collection = db[USERS]
games_collection = db[GAMES]


def clear_users_collection():
    """remove all records from 'users' collection"""
    users_collection.delete_many({})


def clear_games_collection():
    """remove all records from 'users' collection"""
    games_collection.delete_many({})


def add_user(f_name, l_name, email, password, tag, main):
    """
    adds a user to 'users' collection if name is unique

    :param f_name: user's first name
    :param l_name: user's last name
    :param email: user's email
    :param password: password for user's account
    :param tag: user's smash tag
    :param main: user's main
    :return: User obj
    """
    if '' in [f_name, l_name, email, password, tag, main]:
        raise EmptyEntry()
    if not re.search('^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$', email):
        raise InvalidEmail(email)
    if not re.search('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$', password):
        raise InvalidPassword()
    if users_collection.find_one({"name": email}) is not None:
        raise UserAlreadyExists(email)
    _id = 0
    while True:
        _id = random.randint(0, 999999999)
        u = users_collection.find_one({"_id": _id})
        if u is None:
            break
    new_user = User(_id, f_name, l_name, email, password, tag, main)
    users_collection.insert_one(new_user.__dict__)
    return new_user


def get_user_by_auth(email, password):
    """
    get all data for user by auth info

    :param email: user email
    :param password: user password
    :return: user object
    """
    u = users_collection.find_one({"$and": [{EMAIL: email}, {PASSWORD: password}]})
    if u is None:
        raise UserNotFound(email)
    user = User(u[ID], u[F_NAME], u[L_NAME], u[EMAIL], u[PASSWORD], u[TAG], u[MAIN], u[GAMES])
    return user


def get_user(_id):
    """
    get all data for user by id

    :param _id: object id
    :return: user object
    """
    u = users_collection.find_one({ID: _id})
    if u is None:
        raise UserNotFound(_id)
    user = User(u[ID], u[F_NAME], u[L_NAME], u[EMAIL], u[PASSWORD], u[TAG], u[MAIN], u[GAMES])
    return user.__dict__


def remove_user(_id):
    """
    removes user from 'users' collection based on email

    :param _id: user's _id
    :return: n/a
    """
    users_collection.delete_one({ID: _id})


def add_game(user: int, user_char: str, opponent: int, opponent_char: str,
             stage: str, win: bool, user_stock: int, opponent_stock: int):
    """
    validate users exist and are not the same
    create player matches and id
    create game obj and add to db

    :param user: id of user
    :param user_char: character used by user
    :param opponent: id of opponent
    :param opponent_char: character used by opponent
    :param stage: stage game was played on
    :param win: did user win
    :param user_stock: how many stocks did user have at match end
    :param opponent_stock: how many stocks did opponent have at match end
    :return: game obj
    """
    if user is opponent:
        raise UserIsOpponent
    usr = users_collection.find_one({ID: user})
    if usr is None:
        raise UserNotFound(user)
    opp = users_collection.find_one({ID: opponent})
    if opp is None:
        raise UserNotFound(opponent)

    # generate random match_up id
    _id = 0
    while True:
        _id = random.randint(0, 999999999)
        m = games_collection.find_one({ID: _id})
        if m is None:
            break
    # create games with user and opponent data
    user_match = PlayerMatch(user, usr[EMAIL], usr[TAG], user_char, win, user_stock, True)
    opponent_match = PlayerMatch(opponent, opp[EMAIL], opp[TAG], opponent_char, not win, opponent_stock)

    # add match up to db
    new_game = Game(_id, stage, [user_match, opponent_match])
    games_collection.insert_one(new_game.dict())
    # add match up id to user and opponent's match up arrays
    users_collection.update_one({ID: user}, {"$push": {GAMES: _id}})
    users_collection.update_one({ID: opponent}, {"$push": {GAMES: _id}})
    return new_game


def approve_game(user: int, game_ids: list):
    games_collection.update_many(
        {ID: {"$in": game_ids}, "player_matches.user_id": user},
        {"$set": {"player_matches.$.approved": True}}
    )


def change_main(user, main):
    """
    changes main for user, 'user'

    :param user: id for user
    :param main: new 'main' value for user
    :return: n/a
    """
    if users_collection.find_one({ID: user}) is None:
        raise UserNotFound(user)
    users_collection.update_one({ID: user}, {"$set": {MAIN: main}})


def get_all_match_ups(user):
    """
    :param user: user's id
    :return: list of all game objects for user
    """
    if users_collection.find_one({ID: user}) is None:
        raise UserNotFound(user)
    u = users_collection.find_one({ID: user})
    games = games_collection.find({ID: {"$in": u[GAMES]}})
    return games


def get_all_past_opponents(user):
    """
    :param user: user's id
    :return: list of all past opponents for user
    """
    opponents = []
    if users_collection.find_one({ID: user}) is None:
        raise UserNotFound(user)
    u = users_collection.find_one({ID: user})
    games = games_collection.find({ID: {"$in": u[GAMES]}})
    for game in games:
        player_matches = game["player_matches"]
        for pm in player_matches:
            if pm["user_id"] != user and not any(o[ID] == pm["user_id"] for o in opponents):
                opponents.append({ID: pm["user_id"], EMAIL: pm[EMAIL], TAG: pm[TAG]})
    return opponents


def get_match_up(user, opponent):
    """
    :param user: user's email
    :param opponent: list of all match up objects for user
    :return:
    """
    return


# For testing functions
clear_users_collection()
clear_games_collection()

adam = add_user('Adam', 'Tamargo', 'atamargo@ufl.edu', 'Blackacre1', 'Tod', 'Captain Falcon').get_id()
mike = add_user('Mike', 'Cuervo', 'mikec@gmail.com', 'CuervoPass1', 'Buervo', 'Falco').get_id()
john = add_user('John', 'Carey', 'jc813@yahoo.com', 'JohnPass1', 'John', 'Captain Falcon').get_id()
am_game1 = add_game(adam, 'Mr. Game & Watch', mike, 'Kirby', 'Final Destination', True, 4, 0).get_id()
am_game2 = add_game(adam, 'Fox', mike, 'Falco', 'Pokemon Stadium', False, 0, 1).get_id()
add_game(adam, 'Yoshi', john, 'Kirby', 'Fountain of Dreams', True, 4, 0)
add_game(adam, 'Captain Falcon', john, 'Falco', 'Pokemon Stadium', True, 1, 0)
add_game(mike, 'Samus', john, 'Falco', 'Yoshi\'s Island', True, 1, 0)

approve_game(mike, [am_game2, am_game1])
#
# # remove_user('mikec@gmail.com')
#
for match_up in get_all_match_ups(adam):
    print(match_up)

print('\n')
for opponent in get_all_past_opponents(adam):
    print(opponent)
