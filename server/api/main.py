import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from api import route

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(route)


def start():
    """
    Launched with `poetry run start` at root level
    """

    uvicorn.run(
        "api.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
