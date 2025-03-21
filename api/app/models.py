from pydantic import BaseModel, Field


class HelloResponse(BaseModel):
    message: str


class CreateCashSessionRequest(BaseModel):
    name: str = Field(..., description="The name of the cash session")
    users: list[str] = Field(..., description="The users in the cash session")


class JoinCashSessionRequest(BaseModel):
    userName: str = Field(..., description="The name of the user joining the session")


class AddExpenseRequest(BaseModel):
    amount: float = Field(..., description="The amount of the expense")
    userId: str = Field(..., description="The user who paid for the expense")


class DeleteExpenseRequest(BaseModel):
    expenseId: str = Field(..., description="The ID of the expense to delete")
