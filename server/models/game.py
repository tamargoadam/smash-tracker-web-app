import datetime


class MatchUp:
    def __init__(self, _id: int, stage: str, games: list = [], date: str = ''):
        """
        :param _id: object id
        :param stage: stage game was played on
        :param games: list of 2 game objects, one obj for each players game data
        :param date: datetime string indicating the creation of the object
        """

        assert _id is not None
        assert stage != ""
        assert len(games) == 2

        self._id = _id
        self.stage = stage
        self.date = datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S") if date is '' else date
        self.games = games

    def dict(self):
        match_up_dict = {
            "_id": self._id,
            "stage": self.stage,
            "date": self.date,
            "games": []
        }
        for game in self.games:
            match_up_dict["games"].append(game.__dict__)
        return match_up_dict

    def __str__(self):
        return str(self.dict())

