class MatchUp:
    def __init__(self, opponent: str, opponent_tag: str, wins: int = 0, losses: int = 0, games: list = []):
        """
        :param opponent: email of match up opponent
        :param opponent_tag: tag of opponent
        :param wins: number of wins for user
        :param losses: number of wins for opponent
        :param games: list of games between user and opponent
        """

        assert opponent != ""
        assert opponent_tag != ""
        assert wins >= 0
        assert losses >= 0

        self.opponent = opponent
        self.opponent_tag = opponent_tag
        self.wins = wins
        self.losses = losses
        self.games = games

    def dict(self):
        match_up_dict = {
            "opponent": self.opponent,
            "opponent_tag": self.opponent_tag,
            "wins": self.wins,
            "losses": self.losses,
            "games": []
        }
        for game in self.games:
            match_up_dict["games"].append(game.__dict__)
        return match_up_dict

    def __str__(self):
        return str(self.dict())

