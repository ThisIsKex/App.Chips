from decimal import Decimal
import json
import boto3
import os

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["DYNAMODB_TABLE"])


def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError


def create(event):
    try:
        body = json.loads(event["body"])

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
        return {
            "statusCode": 200,
            "body": json.dumps(item),
        }
    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}


def get_item(event):
    item_id = event["queryStringParameters"].get("id")
    if not item_id:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "The 'id' query parameter is required"}),
        }

    try:
        response = table.get_item(Key={"id": item_id})
        item = response.get("Item")
        if not item:
            return {
                "statusCode": 404,
                "body": json.dumps({"error": "Item not found"}),
            }

        return {
            "statusCode": 200,
            "body": json.dumps(item),
        }
    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}


def add_expense(event):
    body = json.loads(event["body"])
    print(event)
    item_id = event["queryStringParameters"].get("id")
    amount = body.get("amount")
    user_id = body.get("userId")

    if not item_id or not user_id or not amount:
        return {
            "statusCode": 400,
            "body": json.dumps(
                {"error": "The 'id', 'userId', and 'expense' fields are required"}
            ),
        }

    try:
        response = table.get_item(Key={"id": item_id})
        item = response.get("Item")
        if not item:
            return {
                "statusCode": 404,
                "body": json.dumps({"error": "Item not found"}),
            }

        expense_id = generate_unique_id()
        new_expense = {
            "id": expense_id,
            "user_id": user_id,
            "amount": amount,
        }

        if "expenses" not in item or not item["expenses"]:
            item["expenses"] = [new_expense]
        else:
            item["expenses"].append(new_expense)

        table.put_item(Item=item)
        return {
            "statusCode": 200,
            "body": json.dumps(item, default=decimal_default),
        }
    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}


def main(event, context):
    http_method = event["httpMethod"]
    if http_method == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
            "body": "",
        }
    elif http_method == "POST":
        return create(event)
    elif http_method == "GET":
        return get_item(event)
    elif http_method == "PUT":
        if event["path"] == "/add-expense":
            return add_expense(event)
        elif event["path"] == "/add-user":
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "The 'id' path parameter is required"}),
            }
        else:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Unsupported path"}),
            }

    elif http_method == "DELETE":
        # Implement DELETE logic here
        return {
            "statusCode": 200,
            "body": json.dumps({"message": "DELETE method not implemented"}),
        }

    else:
        return {"statusCode": 400, "body": json.dumps({"error": "Unsupported method"})}


def generate_unique_id():
    import uuid

    return str(uuid.uuid4())
