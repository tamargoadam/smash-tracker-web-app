import datetime


class Game:
    def __init__(self, _id: int, stage: str, player_matches: list = [], date: str = ''):
        """
        :param _id: object id
        :param stage: stage game was played on
        :param player_matches: list of 2 game objects, one obj for each players game data
        :param date: datetime string indicating the creation of the object
        """

        assert _id is not None
        assert stage != ""
        assert len(player_matches) == 2

        self._id = _id
        self.stage = stage
        self.date = datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S") if date is '' else date
        self.player_matches = player_matches

    def get_id(self):
        return self._id

    def dict(self):
        match_up_dict = {
            "_id": self._id,
            "stage": self.stage,
            "date": self.date,
            "player_matches": []
        }
        for player_match in self.player_matches:
            match_up_dict["player_matches"].append(player_match.__dict__)
        return match_up_dict

    def __str__(self):
        return str(self.dict())

