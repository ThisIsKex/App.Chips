import uuid
from decimal import Decimal


def generate_unique_id() -> str:
    return str(uuid.uuid4())


def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError
