from fastapi import APIRouter

from . import funding

route = APIRouter(prefix="/v1")

route.include_router(funding.route)

