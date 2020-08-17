class Game:
    def __init__(self, user_id: int, email: str, tag: str, char: str, win: bool, stock: int, approved: bool = False):
        """
        :param user_id: id of user
        :param email: email of user
        :param tag: tag of user
        :param char: character used by user
        :param win: did user win?
        :param stock: user stocks at game end
        :param approved: record approved by user
        """

        # TODO: Add assertions for all models (add constant lists for comparison)

        assert user_id is not None
        assert email != ""
        assert tag != ""
        assert char != ""
        assert 0 <= stock <= 4

        self.user_id = user_id
        self.email = email
        self.tag = tag
        self.char = char
        self.win = win
        self.stock = stock
        self.approved = approved

    def __str__(self):
        return str(self.__dict__)
