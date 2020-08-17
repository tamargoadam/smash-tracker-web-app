import re


class User:
    def __init__(self, _id: int, f_name: str, l_name: str, email: str,
                 password: str, tag: str, main: str, games: list = []):
        """
        :param _id: object id
        :param f_name: first name
        :param l_name: last name
        :param email: email address
        :param password: password
        :param tag: smash tag identifying user
        :param main: character user most frequently plays
        :param games: list of all games the user has played
        """

        assert f_name != ""
        assert l_name != ""
        assert re.search('^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$', email)
        assert re.search('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$', password)
        assert tag != ""
        assert main != ""

        self._id = _id
        self.f_name = f_name
        self.l_name = l_name
        self.email = email
        self.password = password
        self.tag = tag
        self.main = main
        self.games = games

    def get_id(self):
        return self._id

    def __str__(self):
        return str(self.__dict__)
