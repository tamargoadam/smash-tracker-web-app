class User:
    def __init__(self, name, password, tag, main):
        self.name = name
        self.password = password
        self.tag = tag
        self.main = main
        self.games = []
