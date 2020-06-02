class User:
    def __init__(self, f_name, l_name, email, password, tag, main):
        self.f_name = f_name
        self.l_name = l_name
        self.email = email
        self.password = password
        self.tag = tag
        self.main = main
        self.match_ups = []
