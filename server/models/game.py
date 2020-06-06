import datetime


class Game:
    def __init__(self, _id: str, user_char: str, opponent_char: str, stage: str, win: bool, user_stock: int,
                 opponent_stock: int, user_approved: bool = False, opponent_approved: bool = False, date: str = ''):
        """
        :param _id: object id, matches id of opponents game
        :param user_char: character used by user
        :param opponent_char: character used by opponent
        :param stage: stage game was played on
        :param win: did user win?
        :param user_stock: user stocks at game end
        :param opponent_stock: opponent stocks at game end
        :param user_approved: record approved by user
        :param opponent_approved: record approved by opponent
        :param date: date record was created
        """
        self._id = _id
        self.user_char = user_char
        self.opponent_char = opponent_char
        self.stage = stage
        self.win = win
        self.user_stock = user_stock
        self.opponent_stock = opponent_stock
        self.user_approved = user_approved
        self.opponent_approved = opponent_approved
        self.date = datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S") if date is '' else date

    def __str__(self):
        return str(self.__dict__)
