class Error(Exception):
    """Base class for exceptions in this module."""
    def __init__(self):
        self.message = "An error has occurred."


class UserAlreadyExists(Error):
    def __init__(self, email):
        self.message = 'User with email, \'{0}\', already exists.'.format(email)


class UserNotFound(Error):
    def __init__(self, email):
        self.message = 'User with email, \'{0}\', not found.'.format(email)


class GameNotFound(Error):
    def __init__(self, user, opponent):
        self.message = 'No games between users \'{0}\' and \'{1}\' were found.'.format(user, opponent)


class MatchUpNotFound(Error):
    def __init__(self, user, opponent):
        self.message = 'No match up between users \'{0}\' and \'{1}\' was not found.'.format(user, opponent)


class MatchUpAlreadyExists(Error):
    def __init__(self, user, opponent):
        self.message = 'Match up between users \'{0}\' and \'{1}\' already exists.'.format(user, opponent)


class UserIsOpponent(Error):
    def __init__(self):
        self.message = 'User and opponent must not be the same.'


class EmptyEntry (Error):
    def __init__(self):
        self.message = 'One or more entries are blank.'


class InvalidEmail (Error):
    def __init__(self, email):
        self.message = '\'{0}\' is not a valid email.'.format(email)


class InvalidPassword (Error):
    def __init__(self):
        self.message = """All passwords must have 
        at least one digit [0-9],
        one lowercase character [a-z],
        one uppercase character [A-Z],
        and at least 8 characters in length, but no more than 32."""
