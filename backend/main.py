import os
import requests
import math
from typing import List, Dict, Optional

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

class Datacenter(BaseModel):
    cloud_description: str
    cloud_name: str
    geo_region: str
    geo_latitude: float
    geo_longitude: float
    distance: Optional[float]

class CloudModel(BaseModel):
    userLongitude: float
    userLatitude: float
    clouds: List[Datacenter]

@app.get("/get_clouds")
def get_all_clouds():
    """
    Get all clouds supported by Aiven from their public REST-API
    """
    caching_enabled = os.environ.get("CACHING_ENABLED", False)
    if caching_enabled: # and if result is in cache
        pass # would return a cached response here

    res = requests.get("https://api.aiven.io/v1/clouds")

    return res.json()


@app.post("/sort_clouds_by_distance")
def sort_clouds(sortClouds: CloudModel):

    def calculate_cloud_distance_from_user(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """
            Calculates the distance between two points on earth's surface
            given longitude/latitude of those points
        """
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = (math.sin(dlat / 2) * math.sin(dlat / 2) +
            math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
            math.sin(dlon / 2) * math.sin(dlon / 2))
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        d = round(6371 * c)
        return d

    def sort_clouds_by_nearest_distance(cloud_list: List[Datacenter]) -> List[Datacenter]:
        return sorted(cloud_list, key = lambda i: i.distance)

    userLatitude = sortClouds.userLatitude
    userLongitude = sortClouds.userLongitude
    cloud_list = sortClouds.clouds

    for cloud in cloud_list:
        cloud.distance = calculate_cloud_distance_from_user(
            userLatitude,
            userLongitude,
            cloud.geo_latitude,
            cloud.geo_longitude
            )

    sorted_clouds = sort_clouds_by_nearest_distance(cloud_list)
    return {"clouds": sorted_clouds}
