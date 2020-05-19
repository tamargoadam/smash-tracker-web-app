from pymongo import MongoClient
from models.user import User
from models.game import Game
from data.exceptions import *

cluster = MongoClient('mongodb+srv://tamargoadam:Blackacre1@cluster0-kahtq.mongodb.net/test?retryWrites=true&w=majority')
db = cluster["melee"]
collection = db["users"]


def clear_users_collection():
    """remove all records from 'users' collection"""
    collection.delete_many({})


def add_user(name, password, tag, main):
    """adds a user to 'users' collection if name is unique"""
    if collection.find_one({"name": name}) is not None:
        raise UserAlreadyExists(name)
    collection.insert_one(User(name, password, tag, main).__dict__)


def remove_user(name):
    """removes user from 'users' collection based on name"""
    collection.remove({"name": name})


def add_game(user: str, user_char: str, opponent: str, opponent_char: str,
             stage: str, win: bool, user_stock: int, opponent_stock: int):
    """
    validate users exist and are not the same
    update games array for each user
    """
    if user is opponent:
        raise UserIsOpponent
    if collection.find_one({"name": user}) is None:
        raise UserNotFound(user)
    if collection.find_one({"name": opponent}) is None:
        raise UserNotFound(opponent)
    collection.update_one({"name": user},
                          {"$push":
                                  {
                                   "games": Game(user_char, opponent, opponent_char,
                                                 stage, win, user_stock, opponent_stock).__dict__
                              }})
    collection.update_one({"name": opponent},
                          {"$push":
                                  {
                                  "games": Game(opponent_char, user, user_char,
                                                stage, not win, opponent_stock, user_stock).__dict__
                              }})


def change_main(name, main):
    """changes main for user, 'user'"""
    if collection.find_one({"name": name}) is None:
        raise UserNotFound(name)
    collection.update_one({"name": name}, {"$set": {"main": main}})


def get_all_games(name):
    games = []
    if collection.find_one({"name": name}) is None:
        raise UserNotFound(name)
    u = collection.find_one({"name": name})
    for game in u["games"]:
        games.append(Game(game["user_char"], game["opponent"], game["opponent_char"], game["stage"],
                          game["win"], game["user_stock"], game["opponent_stock"], game["date"]))
    return games


def get_matchup(user, opponent):
    games = []
    for game in get_all_games(user):
        if game.opponent == opponent:
            games.append(game)
    if not games:
        raise UserNotFound(opponent)
    return games


clear_users_collection()
add_user('Tod', 'pass', 'Tod', 'Captain Falcon')
add_user('Buervo', 'pass', 'Buervo', 'Falco')
add_game('Tod', 'Captain Falcon', 'Buervo', 'Kirby', 'Final Destination', True, 4, 0)
add_game('Tod', 'Captain Falcon', 'Buervo', 'Falco', 'Pokemon Stadium', True, 1, 0)
for game in get_all_games('Buervo'):
    print(game)

