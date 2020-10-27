# Aivenproxy
> A full web-service for easier selection of supported [Aiven](https://aiven.io/) cloud centers.

> The projects purpose is to be a coding assignment for applying to Aiven

### Global requirements
- Python v3.6
- Docker
- Node (v14) & npm

## How to setup
- Make sure you have all global requirements installed
- Clone the repository
- Build backend `./run.py build_backend`
- Install frontend dependencies `npm i` or `./run.py build_frontend`

## How to run
- Run backend-container `./run.py run_backend_dev`
- Start frontend `npm start` or `./run.py start_frontend`

### How CI-pipeline would work:
- Tests would be run (front & back)
- Build frontend, push to Amazon S3 for deployment or build a reverse-proxy Nginx image for serving the files
- Build backend-image, push to image-repository
