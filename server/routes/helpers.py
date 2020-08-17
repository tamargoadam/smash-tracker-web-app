from models.user import User
from data.db import get_all_past_opponents
from constants.constants import *


def games_to_match_ups(games: list, user: User):
    match_ups = []
    opponents = get_all_past_opponents(user.get_id())
    for opponent in opponents:
        # create match up for each opponent
        mu = {
            OPPONENT: opponent[EMAIL],
            OPPONENT_TAG: opponent[TAG],
            WINS: 0,
            LOSSES: 0,
            GAMES: []
        }
        for game in games:
            # for each game against opponent that has been approved add game to match up
            if any(pm.user == opponent[ID] for pm in game.player_matches) \
                    and all(pm.approved for pm in game.player_matches):
                new_game = {
                    STAGE: game.stage,
                    DATE: game.date
                }
                for pm in game.player_matches:
                    if pm.user == user.get_id():
                        new_game[USER_CHAR] = pm.character
                        new_game[USER_STOCK] = pm.stock
                        new_game[USER_APPROVED] = pm.approved
                        new_game[WIN] = pm.win
                        if pm.win:
                            mu[WINS] += 1
                        else:
                            mu[LOSSES] += 1
                    else:
                        new_game[OPPONENT_CHAR] = pm.character
                        new_game[OPPONENT_STOCK] = pm.stock
                        new_game[OPPONENT_APPROVED] = pm.approved
                mu[GAMES].append(new_game)
        match_ups.append(mu)
    # remove match ups with no games
    i = 0
    while i < len(match_ups):
        if len(match_ups[i][GAMES]) < 1:
            match_ups.pop(i)
        else:
            i += 1
    return match_ups
