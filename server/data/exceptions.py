class Error(Exception):
    """Base class for exceptions in this module."""
    def __init__(self):
        self.message = "An error has occurred."


class UserAlreadyExists(Error):
    def __init__(self, email):
        self.message = 'User with email, {0}, already exists.'.format(email)


class UserNotFound(Error):
    def __init__(self, email):
        self.message = 'User with email, {0}, not found.'.format(email)


class GameNotFound(Error):
    def __init__(self, user, opponent):
        self.message = 'No games between users {0} and {1} were found.'.format(user, opponent)


class UserIsOpponent(Error):
    def __init__(self):
        self.message = 'User and opponent must not be the same.'
