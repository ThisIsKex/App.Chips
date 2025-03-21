import logging
import json
import os
import boto3

from decimal import Decimal
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from app.utils import decimal_default, generate_unique_id
from app.models import (
    AddExpenseRequest,
    CreateCashSessionRequest,
    DeleteExpenseRequest,
    HelloResponse,
    JoinCashSessionRequest,
)
from app.error_models import BadRequestError, NotFoundError

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["DYNAMODB_TABLE"])
logger = logging.getLogger()
logger.setLevel(logging.INFO)

origins = [
    "*",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
handler = Mangum(app)


@app.get("/health-check")
def health_check() -> HelloResponse:
    return HelloResponse(message="Hello, World!")


@app.post("/")
def create(request: CreateCashSessionRequest) -> dict:
    logger.info("Creating a new cash session")
    id = generate_unique_id()
    user_id = generate_unique_id()

    item = {
        "id": id,
        "name": request.name,
        "users": [{"id": user_id, "name": request.users[0]}],
        "expenses": [],
    }

    table.put_item(Item=item)
    return item


@app.get("/")
def get_item(id: str):
    logger.info("Getting a cash session")
    if not id:
        raise BadRequestError("The 'id' field is required")

    response = table.get_item(Key={"id": id})
    item = response.get("Item")
    item = json.loads(json.dumps(item, default=decimal_default))

    if not item:
        raise NotFoundError

    return item


@app.put("/join-session")
def join_session(id: str, request: JoinCashSessionRequest) -> dict:
    logger.info("Joining a session")
    username = request.userName
    if not id or not username:
        raise BadRequestError("The 'id' and 'userName' fields are required")

    response = table.get_item(Key={"id": id})
    item = response.get("Item")
    if not item:
        return {
            "statusCode": 404,
            "body": json.dumps({"error": "Item not found"}),
        }
    user_id = generate_unique_id()
    new_user = {
        "id": user_id,
        "name": username,
    }
    item["users"].append(new_user)
    table.put_item(Item=item)

    item = json.loads(
        json.dumps(item, default=decimal_default)
    )  # parse decimals correctly
    return item


@app.put("/add-expense")
def add_expense(id: str, request: AddExpenseRequest) -> dict:
    logger.info("Adding an expense")
    amount = request.amount
    user_id = request.userId

    if not id or not user_id or not amount:
        raise BadRequestError("The 'id', 'userId', and 'expense' fields are required")

    response = table.get_item(Key={"id": id})
    item = response.get("Item")
    if not item:
        raise NotFoundError("Item not found")

    expense_id = generate_unique_id()
    new_expense = {
        "id": expense_id,
        "userId": user_id,
        "amount": Decimal(amount),
    }

    if "expenses" not in item or not item["expenses"]:
        item["expenses"] = [new_expense]
    else:
        item["expenses"].append(new_expense)

    table.put_item(Item=item)

    item = json.loads(
        json.dumps(item, default=decimal_default)
    )  # parse decimals correctly
    return item


@app.put("/delete-expense")
def delete_expense(id: str, request: DeleteExpenseRequest) -> dict:
    logger.info("Deleting an expense")
    expense_id = request.expenseId

    if not id or not expense_id:
        raise BadRequestError("The 'id' and 'expenseId' fields are required")

    response = table.get_item(Key={"id": id})
    item = response.get("Item")
    if not item:
        raise NotFoundError("Item not found")
    item["expenses"] = [
        expense for expense in item["expenses"] if expense["id"] != expense_id
    ]
    table.put_item(Item=item)

    item = json.loads(
        json.dumps(item, default=decimal_default)
    )  # parse decimals correctly
    return item
