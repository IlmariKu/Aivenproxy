import os
import requests

from fastapi import FastAPI, Response
app = FastAPI()

@app.get("/get_clouds")
def say_hello(response: Response):
    """
    Caching is not implemented, but as a production-app,
    this proxy would cache responses, probably would use Redis
    """
    caching_enabled = os.environ.get("CACHING_ENABLED", False)
    development = os.environ.get("DEVELOPMENT", True)
    if caching_enabled: # and result is in cache
        pass # would return a cached response

    if development:
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    res = requests.get("https://api.aiven.io/v1/clouds")

    return res.json()
