import datetime


class Game:
    def __init__(self, user_char: str, opponent_email: str, opponent_char: str,
                 stage: str, win: bool, user_stock: int, opponent_stock: int, date: str = ''):
        self.user_char = user_char
        self.opponent_email = opponent_email
        self.opponent_char = opponent_char
        self.stage = stage
        self.win = win
        self.user_stock = user_stock
        self.opponent_stock = opponent_stock
        self.date = datetime.datetime.now() if date is '' else date

    def __str__(self):
        return str(self.__dict__)
