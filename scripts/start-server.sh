#!/usr/bin/env bash
# start-server.sh

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

COMPOSE_FILE="docker-compose.${ENV}.yaml"

# Check if the compose file exists
if [[ ! -f "$COMPOSE_FILE" ]]; then
  echo "Docker compose file for $ENV does not exist."
  exit 1
fi

# Sync files
PROJECT_DIR=$PWD
rsync -avz --progress --exclude=node_modules --exclude=dist --exclude=requests.http $PROJECT_DIR/ $SERVER_ADDR:~/drink-water-api/

# Start docker containers in the server
ssh $SERVER_ADDR "cd ~/drink-water-api && docker-compose -f $COMPOSE_FILE up -d"

# Start the watcher script
./scripts/watcher.sh $ENV $SERVER_ADDR
