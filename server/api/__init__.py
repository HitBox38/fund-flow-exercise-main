from fastapi import APIRouter

from . import v1

route = APIRouter(prefix="/api")

route.include_router(v1.route)
