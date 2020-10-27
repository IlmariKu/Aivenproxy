import os
import requests
import math
from typing import List, Dict

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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

class CloudModel(BaseModel):
    userLongitude: float
    userLatitude: float
    clouds: List


@app.post("/sort_clouds_by_distance")
def sort_clouds(sortClouds: CloudModel):

    def get_distance(lat1: float, lon1: float, lat2: float, lon2: float):
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = (math.sin(dlat / 2) * math.sin(dlat / 2) +
            math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
            math.sin(dlon / 2) * math.sin(dlon / 2))
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        d = round(6371 * c)
        return d

    myLat = sortClouds.userLatitude
    myLon = sortClouds.userLongitude
    cloud_list = sortClouds.clouds

    for cloud in cloud_list:
        distance = get_distance(myLat, myLon, cloud["geo_latitude"], cloud["geo_longitude"])
        cloud["distance"] = distance

    cloud_list = sorted(cloud_list, key = lambda i: i['distance'])

    return {"clouds": cloud_list}
