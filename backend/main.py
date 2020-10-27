import os
import requests
import math
from typing import List, Dict

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:1234"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/get_clouds")
def say_hello():
    """
    Caching is not implemented, but as a production-app,
    this proxy would cache responses, probably would use Redis
    """
    caching_enabled = os.environ.get("CACHING_ENABLED", False)
    if caching_enabled: # and result is in cache
        pass # would return a cached response

    res = requests.get("https://api.aiven.io/v1/clouds")

    return res.json()
