from fastapi import APIRouter
from . import graph

route = APIRouter(prefix="/funding")

route.include_router(graph.route)
