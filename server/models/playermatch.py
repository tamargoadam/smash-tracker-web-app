class PlayerMatch:
    def __init__(self, user: int, email: str, tag: str, character: str, win: bool, stock: int, approved: bool = False):
        """
        :param user: id of user
        :param email: email of user
        :param tag: tag of user
        :param character: character used by user
        :param win: did user win?
        :param stock: user stocks at game end
        :param approved: record approved by user
        """

        # TODO: Add assertions for all models (add constant lists for comparison)

        assert user is not None
        assert email != ""
        assert tag != ""
        assert character != ""
        assert 0 <= stock <= 4

        self.user = user
        self.email = email
        self.tag = tag
        self.character = character
        self.win = win
        self.stock = stock
        self.approved = approved

    def __str__(self):
        return str(self.__dict__)
