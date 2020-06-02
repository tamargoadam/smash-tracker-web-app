from pymongo import MongoClient
from models.user import User
from models.game import Game
from data.exceptions import *

cluster = MongoClient('mongodb+srv://tamargoadam:Blackacre1@cluster0-kahtq.mongodb.net/test?retryWrites=true&w=majority')
db = cluster["melee"]
collection = db["users"]

# TODO: incorporate match_up


def clear_users_collection():
    """remove all records from 'users' collection"""
    collection.delete_many({})


def add_user(f_name, l_name, email, password, tag, main):
    """adds a user to 'users' collection if name is unique"""
    if collection.find_one({"name": email}) is not None:
        raise UserAlreadyExists(email)
    collection.insert_one(User(f_name, l_name, email, password, tag, main).__dict__)


def remove_user(email):
    """removes user from 'users' collection based on email"""
    u = collection.find({"games": {"$elemMatch": {"opponent": email}}})
    # finds user with games against opponent with email, 'email'
    for x in u:
        games = get_all_games(x["email"])
        i = 0
        while i < len(games):
            if games[i].opponent == email:
                games.pop(i)
            else:
                i += 1
        set_all_games(x["email"], games)
    collection.delete_one({"email": email})


def add_game(user: str, user_char: str, opponent: str, opponent_char: str,
             stage: str, win: bool, user_stock: int, opponent_stock: int):
    """
    validate users exist and are not the same
    update games array for each user
    """
    if user is opponent:
        raise UserIsOpponent
    if collection.find_one({"email": user}) is None:
        raise UserNotFound(user)
    if collection.find_one({"email": opponent}) is None:
        raise UserNotFound(opponent)
    collection.update_one({"email": user},
                          {"$push":
                              {
                                  "games": Game(user_char, opponent, opponent_char,
                                                stage, win, user_stock, opponent_stock).__dict__
                              }})
    collection.update_one({"email": opponent},
                          {"$push":
                              {
                                  "games": Game(opponent_char, user, user_char,
                                                stage, not win, opponent_stock, user_stock).__dict__
                              }})


def change_main(email, main):
    """changes main for user, 'user'"""
    if collection.find_one({"email": email}) is None:
        raise UserNotFound(email)
    collection.update_one({"email": email}, {"$set": {"main": main}})


def set_all_games(email, games):
    """sets all games for user with email, "email", to list of game objects "games" """
    dict_games = []
    for game in games:
        dict_games.append(game.__dict__)
    collection.update_one({"email": email}, {"$set": {"games": dict_games}})


def get_all_games(email):
    games = []
    if collection.find_one({"email": email}) is None:
        raise UserNotFound(email)
    u = collection.find_one({"email": email})
    for game in u["games"]:
        games.append(Game(game["user_char"], game["opponent"], game["opponent_char"], game["stage"],
                          game["win"], game["user_stock"], game["opponent_stock"], game["date"]))
    return games


def get_match_up(user, opponent):
    games = []
    for game in get_all_games(user):
        if game.opponent == opponent:
            games.append(game)
    if not games:
        raise UserNotFound(opponent)
    return games


# For testing functions
clear_users_collection()
add_user('Adam', 'Tamargo', 'atamargo@ufl.edu', 'pass', 'Tod', 'Captain Falcon')
add_user('Mike', 'Cuervo', 'mikec@gmail.com', 'pass', 'Buervo', 'Falco')
add_user('John', 'Carey', 'jc813@yahoo.com', 'pass', 'John', 'Captain Falcon')
add_game('atamargo@ufl.edu', 'Captain Falcon', 'mikec@gmail.com', 'Kirby', 'Final Destination', True, 4, 0)
add_game('atamargo@ufl.edu', 'Captain Falcon', 'mikec@gmail.com', 'Falco', 'Pokemon Stadium', True, 1, 0)
add_game('atamargo@ufl.edu', 'Captain Falcon', 'jc813@yahoo.com', 'Kirby', 'Final Destination', True, 4, 0)
add_game('atamargo@ufl.edu', 'Captain Falcon', 'jc813@yahoo.com', 'Falco', 'Pokemon Stadium', True, 1, 0)
add_game('mikec@gmail.com', 'Captain Falcon', 'jc813@yahoo.com', 'Falco', 'Pokemon Stadium', True, 1, 0)

remove_user('mikec@gmail.com')

for game in get_all_games('atamargo@ufl.edu'):
    print(game)