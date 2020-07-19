from pymongo import MongoClient
from bson.objectid import ObjectId
from models.user import User
from models.match_up import MatchUp
from models.game import Game
from data.exceptions import *
import re

cluster = MongoClient(
    'mongodb+srv://tamargoadam:Blackacre1@cluster0-kahtq.mongodb.net/test?retryWrites=true&w=majority')
db = cluster["melee"]
collection = db["users"]


def clear_users_collection():
    """remove all records from 'users' collection"""
    collection.delete_many({})


def add_user(f_name, l_name, email, password, tag, main):
    """
    adds a user to 'users' collection if name is unique

    :param f_name: user's first name
    :param l_name: user's last name
    :param email: user's email
    :param password: password for user's account
    :param tag: user's smash tag
    :param main: user's main
    :return: n/a
    """
    if '' in [f_name, l_name, email, password, tag, main]:
        raise EmptyEntry()
    if not re.search('^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$', email):
        raise InvalidEmail(email)
    if not re.search('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$', password):
        raise InvalidPassword()
    if collection.find_one({"name": email}) is not None:
        raise UserAlreadyExists(email)
    collection.insert_one(User(f_name, l_name, email, password, tag, main).__dict__)


def get_user(email, password):
    """
    get all data for user

    :param email: user email
    :param password: user password
    :return: user object
    """
    u = collection.find_one({"$and": [{"email": email}, {"password": password}]})
    if u is None:
        raise UserNotFound(email)
    user = User(u['f_name'], u['l_name'], u['email'], u['password'], u['tag'], u['main'])
    return user.__dict__


def remove_user(user):
    """
    removes user from 'users' collection based on email

    :param user: user's email
    :return: n/a
    """
    # finds user with games against opponent with email, 'user', and deletes match up
    u = collection.update_many({"$pull": {"users.match_ups": {"opponent": user}}})
    # removes user
    collection.delete_one({"email": user})


def add_match_up(user: str, opponent: str):
    """
    validate users exist and are not the same
    create match up with no games for each user

    :param user: email of current user
    :param opponent: email of opponent
    :return: n/a
    """
    if user is opponent:
        raise UserIsOpponent
    user_data = collection.find_one({"email": user})
    if user_data is None:
        raise UserNotFound(user)
    opponent_data = collection.find_one({"email": opponent})
    if opponent_data is None:
        raise UserNotFound(opponent)
    if collection.find_one({"email": user, "match_ups.opponent": opponent}) is not None:
        raise MatchUpAlreadyExists(user, opponent)
    collection.update_one(
        {"email": user},
        {"$push":
            {
                "match_ups":
                    {
                        "opponent": opponent,
                        "opponent_tag": opponent_data["tag"],
                        "wins": 0,
                        "losses": 0,
                        "games": []
                    }
            }
        }
    )
    collection.update_one(
        {"email": opponent},
        {"$push":
            {
                "match_ups":
                    {
                        "opponent": user,
                        "opponent_tag": user_data["tag"],
                        "wins": 0,
                        "losses": 0,
                        "games": []
                    }
            }
        }
    )


def add_game(user: str, user_char: str, opponent: str, opponent_char: str,
             stage: str, win: bool, user_stock: int, opponent_stock: int):
    """
    validate users exist and are not the same
    create match up if doesn't already exist
    update games array for each user match up

    :param user: email of current user
    :param user_char: character used by user
    :param opponent: email of opponent
    :param opponent_char: character used by opponent
    :param stage: stage game was played on
    :param win: did user win
    :param user_stock: how many stocks did user have at match end
    :param opponent_stock: how many stocks did opponent have at match end
    :return: n/a
    """
    if user is opponent:
        raise UserIsOpponent
    if collection.find_one({"email": user}) is None:
        raise UserNotFound(user)
    if collection.find_one({"email": opponent}) is None:
        raise UserNotFound(opponent)
    if collection.find_one({"email": user, "match_ups.opponent": opponent}) is None:
        add_match_up(user, opponent)
    # increment wins or losses for each player based on 'win' bool
    if win:
        collection.update_one({"email": user, "match_ups.opponent": opponent},
                              {"$inc":
                                  {
                                      "match_ups.$.wins": 1
                                  }}
                              )
        collection.update_one({"email": opponent, "match_ups.opponent": user},
                              {"$inc":
                                  {
                                      "match_ups.$.losses": 1
                                  }}
                              )
    else:
        collection.update_one({"email": user, "match_ups.opponent": opponent},
                              {"$inc":
                                  {
                                      "match_ups.$[].losses": 1
                                  }}
                              )
        collection.update_one({"email": opponent, "match_ups.opponent": user},
                              {"$inc":
                                  {
                                      "match_ups.$[].wins": 1
                                  }}
                              )
    # add game to each player's match up
    _id = str(ObjectId())
    collection.update_one({"email": user, "match_ups.opponent": opponent},
                          {"$push":
                              {
                                  "match_ups.$.games": Game(_id, user_char, opponent_char, stage,
                                                            win, user_stock, opponent_stock, True, False).__dict__
                              }})
    collection.update_one({"email": opponent, "match_ups.opponent": user},
                          {"$push":
                              {
                                  "match_ups.$.games": Game(_id, opponent_char, user_char, stage,
                                                            not win, opponent_stock, user_stock, False, True).__dict__
                              }})


def approve_game(user: str, opponent: str, game_ids: list):
    user_match_ups = collection.find_one({"email": user},
                                         {"match_ups": {"$elemMatch": {"opponent": opponent}}})["match_ups"]
    for match_up in user_match_ups:
        if match_up["opponent"] == opponent:
            user_match_up = match_up
            break
    opponent_match_ups = collection.find_one({"email": opponent},
                                             {"match_ups": {"$elemMatch": {"opponent": user}}})["match_ups"]
    for match_up in opponent_match_ups:
        if match_up["opponent"] == user:
            opponent_match_up = match_up
            break
    # set games for user's match ups with updated approval
    games = []
    for game in user_match_up["games"]:
        if game["_id"] in game_ids:
            game["user_approved"] = True
        games.append(game)
    collection.update_one({"email": user, "match_ups.opponent": opponent},
                          {"$set": {"match_ups.$.games": games}})
    # set games for opponent's match ups with updated approval
    games = []
    for game in opponent_match_up["games"]:
        if game["_id"] in game_ids:
            game["opponent_approved"] = True
        games.append(game)
    collection.update_one({"email": opponent, "match_ups.opponent": user},
                          {"$set": {"match_ups.$.games": games}})


def change_main(user, main):
    """
    changes main for user, 'user'

    :param user: email for user
    :param main: new 'main' value for user
    :return: n/a
    """
    if collection.find_one({"email": user}) is None:
        raise UserNotFound(user)
    collection.update_one({"email": user}, {"$set": {"main": main}})


def get_all_match_ups(email):
    """
    :param email: user's email
    :return: list of all match up objects for user
    """
    match_ups = []
    if collection.find_one({"email": email}) is None:
        raise UserNotFound(email)
    u = collection.find_one({"email": email})
    for match_up in u["match_ups"]:
        games = []
        for game in match_up["games"]:
            # add game obj to games
            games.append(Game(game["_id"], game["user_char"], game["opponent_char"], game["stage"], game["win"],
                              game["user_stock"],
                              game["opponent_stock"], game["user_approved"], game["opponent_approved"], game["date"]))
        match_ups.append(MatchUp(match_up["opponent"], match_up["opponent_tag"], match_up["wins"],
                                 match_up["losses"], games))
    return match_ups


def get_all_past_opponents(email):
    """
    :param email: user's email
    :return: list of all past opponents for user
    """
    opponents = []
    if collection.find_one({"email": email}) is None:
        raise UserNotFound(email)
    u = collection.find_one({"email": email})
    for match_up in u["match_ups"]:
        opponents.append({"email": match_up["opponent"], "tag": match_up["opponent_tag"]})
    return opponents


def get_match_up(user, opponent):
    """
    :param user: user's email
    :param opponent: list of all match up objects for user
    :return:
    """
    return


# For testing functions
"""
clear_users_collection()
add_user('Adam', 'Tamargo', 'atamargo@ufl.edu', 'pass', 'Tod', 'Captain Falcon')
add_user('Mike', 'Cuervo', 'mikec@gmail.com', 'pass', 'Buervo', 'Falco')
add_user('John', 'Carey', 'jc813@yahoo.com', 'pass', 'John', 'Captain Falcon')
add_game('atamargo@ufl.edu', 'Mr. Game & Watch', 'mikec@gmail.com', 'Kirby', 'Final Destination', True, 4, 0)
add_game('atamargo@ufl.edu', 'Fox', 'mikec@gmail.com', 'Falco', 'Pokemon Stadium', False, 0, 1)
add_game('atamargo@ufl.edu', 'Yoshi', 'jc813@yahoo.com', 'Kirby', 'Fountain of Dreams', True, 4, 0)
add_game('atamargo@ufl.edu', 'Captain Falcon', 'jc813@yahoo.com', 'Falco', 'Pokemon Stadium', True, 1, 0)
add_game('mikec@gmail.com', 'Samus', 'jc813@yahoo.com', 'Falco', 'Yoshi\'s Island', True, 1, 0)
"""

approve_game('mikec@gmail.com', 'atamargo@ufl.edu', [str(ObjectId('5edc1c8cdf3fa67d0d7a936d'))])

# remove_user('mikec@gmail.com')

for match_up in get_all_match_ups('atamargo@ufl.edu'):
    print(match_up)
