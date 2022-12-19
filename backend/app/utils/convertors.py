def to_boolean(variable):
    if (
        variable == "True"
        or variable == "true"
        or variable == 1
        or variable == "1"
    ):
        return True
    return False
