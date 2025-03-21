class BadRequestError(Exception):
    def __init__(self, message):
        self.message = message
        self.status_code = 400


class NotFoundError(Exception):
    def __init__(self):
        self.message = "Item not found"
        self.status_code = 404
