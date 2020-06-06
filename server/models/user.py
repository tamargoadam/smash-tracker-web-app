class User:
    def __init__(self, f_name, l_name, email, password, tag, main):
        """
        :param f_name: first name
        :param l_name: last name
        :param email: email address
        :param password: password
        :param tag: smash tag identifying user
        :param main: character user most frequently plays
        """
        self.f_name = f_name
        self.l_name = l_name
        self.email = email
        self.password = password
        self.tag = tag
        self.main = main
        self.match_ups = []
