import re


def matches_email(string: str):
    return matches_pattern(string, r"^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\" +
                           r".,;:\s@\"]+)*)|(\".+\"))@((\"[[0-9]{1,3}\.[0-9]" +
                           r"{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]" +
                           r"+\.)+[a-zA-Z]{2,}))$")


def matches_password(string: str):
    # Minimum eight characters, at least one uppercase letter, one lowercase
    # letter, one number and one special character
    return matches_pattern(string, r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$" +
                           r"!%*?&])[A-Za-z\d@$!%*?&]{8,}$")


def matches_pattern(string: str, regex: str):
    pattern = re.compile(regex)

    if pattern.match(string) is not None:
        return True
    return False
