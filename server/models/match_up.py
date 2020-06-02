class MatchUp:
    def __init__(self, opponent: str, wins: int = 0, losses: int = 0, games: list = []):
        self.opponent = opponent
        self.wins = wins
        self.losses = losses
        self.games = games

    def __str__(self):
        match_up_dict = {
            "opponent": self.opponent,
            "wins": self.wins,
            "losses": self.losses,
            "games": []
        }
        for game in self.games:
            match_up_dict["games"].append(game.__dict__)
        return str(match_up_dict)