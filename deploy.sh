#!/bin/bash
set -e

gcloud builds submit \
  --project=gifted-palace-464208-n2 \
  --region=europe-west1 \
  --config=cloudbuild.yaml
