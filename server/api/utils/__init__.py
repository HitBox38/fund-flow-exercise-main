from typing import Type, Any, Optional, TypeVar

from pydantic import TypeAdapter

V = TypeVar("V")


def try_parse_obj_as(
        schema: Type[V],
        obj: Any,
) -> Optional[V]:
    try:
        return TypeAdapter(schema).validate_python(obj)
    except ValueError as e:
        return None
