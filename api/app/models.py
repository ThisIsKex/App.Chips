from pydantic import BaseModel, Field


class HelloResponse(BaseModel):
    message: str


class HelloRequest(BaseModel):
    message: str = Field(..., description="Message to return")
