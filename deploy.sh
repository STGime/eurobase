#!/bin/bash
set -e

# Load env vars
source .env

gcloud builds submit \
  --project=gifted-palace-464208-n2 \
  --region=europe-west1 \
  --substitutions="_VITE_NEON_DATABASE_URL=$VITE_NEON_DATABASE_URL" \
  --config=cloudbuild.yaml
