import boto3
import json
import os
import uuid

from decimal import Decimal
from aws_lambda_powertools import Logger
from aws_lambda_powertools.event_handler import APIGatewayRestResolver, CORSConfig
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.event_handler.exceptions import (
    NotFoundError,
    BadRequestError,
)

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["DYNAMODB_TABLE"])
logger = Logger()

cors_config = CORSConfig(
    allow_origin="*",
)
app = APIGatewayRestResolver(cors=cors_config)


def generate_unique_id() -> str:
    return str(uuid.uuid4())


def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError


@app.post("/")
def create():
    logger.info("Creating a new cash session")
    body = json.loads(app.current_event["body"])
    name = body["name"]
    users = body["users"]
    id = generate_unique_id()
    user_id = generate_unique_id()

    item = {
        "id": id,
        "name": name,
        "users": [{"id": user_id, "name": users[0]}],
        "expenses": [],
    }

    table.put_item(Item=item)
    return item


@app.get("/")
def get_item():
    logger.info("Getting a cash session")
    item_id = app.current_event["queryStringParameters"].get("id")
    if not item_id:
        raise BadRequestError("The 'id' field is required")

    response = table.get_item(Key={"id": item_id})
    item = response.get("Item")
    item = json.loads(json.dumps(item, default=decimal_default))

    if not item:
        raise NotFoundError

    return item


@app.put("/join-session")
def join_session():
    logger.info("Joining a session")
    body = json.loads(app.current_event["body"])
    item_id = app.current_event["queryStringParameters"].get("id")
    username = body.get("userName")
    if not item_id or not username:
        raise BadRequestError("The 'id' and 'userName' fields are required")

    response = table.get_item(Key={"id": item_id})
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
def add_expense():
    logger.info("Adding an expense")
    body = json.loads(app.current_event["body"])
    item_id = app.current_event["queryStringParameters"].get("id")
    amount = body.get("amount")
    user_id = body.get("userId")

    if not item_id or not user_id or not amount:
        raise BadRequestError("The 'id', 'userId', and 'expense' fields are required")

    response = table.get_item(Key={"id": item_id})
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
def delete_expense():
    logger.info("Deleting an expense")
    body = json.loads(app.current_event["body"])
    item_id = app.current_event["queryStringParameters"].get("id")
    expense_id = body.get("expenseId")

    if not item_id or not expense_id:
        raise BadRequestError("The 'id' and 'expenseId' fields are required")

    response = table.get_item(Key={"id": item_id})
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


def lambda_handler(event: dict, context: LambdaContext):
    return app.resolve(event, context)
