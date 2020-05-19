class Error(Exception):
    """Base class for exceptions in this module."""
    def __init__(self):
        self.message = "An error has occurred."


class UserAlreadyExists(Error):
    def __init__(self, name):
        self.message = 'User, {0}, already exists.'.format(name)


class UserNotFound(Error):
    def __init__(self, name):
        self.message = 'User, {0}, not found.'.format(name)


class GameNotFound(Error):
    def __init__(self, user, opponent):
        self.message = 'No games between users {0} and {1} were found.'.format(user, opponent)


class UserIsOpponent(Error):
    def __init__(self):
        self.message = 'User and opponent must not be the same.'
