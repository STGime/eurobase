#!/usr/bin/env bash
# Poll a Scaleway Serverless Container custom-domain attachment until it
# transitions from `pending` to `ready` (or `error`).
#
# Usage:
#   scripts/scw-domain-wait.sh <domain-id> [region] [max-attempts] [interval-seconds]
#
# Examples:
#   # www.eurobase.app (default region fr-par, 20 attempts × 15s = 5min)
#   scripts/scw-domain-wait.sh 56449a69-dd7d-4e39-b4ae-d2f487718232
#
#   # apex, poll every 10s for up to 4 min
#   scripts/scw-domain-wait.sh 5964e93d-9f70-47de-aeae-13474734ea81 fr-par 24 10
#
# Find domain IDs with:
#   scw container domain list container-id=<container-id> region=fr-par
#
# Exits 0 on `ready`, 1 on `error` (prints the API error_message), 2 on
# timeout (still `pending`), 3 on usage error, 4 on API error (e.g. wrong
# ID — the CLI itself failed).

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "usage: $0 <domain-id> [region] [max-attempts] [interval-seconds]" >&2
  exit 3
fi

DOMAIN_ID="$1"
REGION="${2:-fr-par}"
MAX_ATTEMPTS="${3:-20}"
INTERVAL="${4:-15}"

for i in $(seq 1 "$MAX_ATTEMPTS"); do
  # Capture both stdout and exit — scw returns an error JSON on 404 with
  # exit 0, which jq would then interpret as data. Detect the "error"
  # top-level key and bail with a clear message rather than looping on
  # "unexpected status" forever.
  json=$(scw container domain get "$DOMAIN_ID" region="$REGION" -o json 2>&1 || true)

  if echo "$json" | jq -e '.error' >/dev/null 2>&1; then
    msg=$(echo "$json" | jq -r '.error.message // .message // "unknown API error"')
    echo "scw API error: $msg" >&2
    echo "check the domain ID with: scw container domain list container-id=<container-id> region=$REGION" >&2
    exit 4
  fi

  status=$(echo "$json" | jq -r '.status // "unknown"')
  hostname=$(echo "$json" | jq -r '.hostname // "<unknown>"')
  printf "attempt %2d/%d — %s: %s\n" "$i" "$MAX_ATTEMPTS" "$hostname" "$status"

  case "$status" in
    ready)
      echo "$hostname is ready — Scaleway-managed cert issued."
      echo "$json" | jq
      exit 0
      ;;
    error)
      err=$(echo "$json" | jq -r '.error_message // "(none)"')
      echo "$hostname failed: $err" >&2
      exit 1
      ;;
    pending|"")
      : # keep waiting
      ;;
    *)
      echo "unexpected status: $status" >&2
      echo "$json" | jq >&2
      exit 1
      ;;
  esac

  [ "$i" -lt "$MAX_ATTEMPTS" ] && sleep "$INTERVAL"
done

echo "timeout — still pending after $MAX_ATTEMPTS attempts (~$((MAX_ATTEMPTS * INTERVAL))s)." >&2
echo "check DNS: dig +short CNAME $hostname @1.1.1.1" >&2
exit 2
