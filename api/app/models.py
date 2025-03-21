from pydantic import BaseModel, Field


class HelloResponse(BaseModel):
    message: str


class HelloRequest(BaseModel):
    message: str = Field(..., description="Message to return")


class BadRequestError(Exception):
    def __init__(self, message):
        self.message = message
        self.status_code = 400


class NotFoundError(Exception):
    def __init__(self):
        self.message = "Item not found"
        self.status_code = 404
