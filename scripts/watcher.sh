#!/usr/bin/env bash
# watcher.sh

# The path to the project directory you want to monitor
PROJECT_DIR=$PWD

# The path to your deploy.sh script
DEPLOY_SCRIPT=./scripts/deploy.sh

ENV=$1
SERVER_ADDR=$2

if [[ -z "$ENV" ]]; then
  echo "Please specify an environment: dev or test."
  exit 1
fi

if [[ -z "$SERVER_ADDR" ]]; then
  echo "Please specify a server address (e.g. eduardokohn@192.168.15.5)."
  exit 1
fi

# Use fswatch to monitor the project directory. When a change is detected, and if it's not in node_modules or dist, run deploy.sh with environment
fswatch -o "$PROJECT_DIR" | while read f; do
  # Check the changed file/folder and see if it's part of node_modules or dist
  if [[ $f != *"/node_modules/"* && $f != *"/dist/"* && $f == *"/src/requests.http"* ]]; then
    $DEPLOY_SCRIPT $ENV $SERVER_ADDR
  fi
done
