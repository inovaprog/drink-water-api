#!/usr/bin/env bash
# deploy.sh

ENV=$1
SERVER_ADDR=$2

if [[ -z "$ENV" ]]; then
  echo "Please specify an environment: dev or test."
  exit 1
fi

if [[ -z "$SERVER_ADDR" ]]; then
  echo "Please specify a server address."
  exit 1
fi

COMPOSE_FILE="docker-compose.${ENV}.yaml"

if [[ ! -f "$COMPOSE_FILE" ]]; then
  echo "Docker compose file for $ENV does not exist."
  exit 1
fi

PROJECT_DIR=$PWD
rsync -avz --progress --exclude=node_modules --exclude=dist --exclude=requests.http $PROJECT_DIR/ $SERVER_ADDR:~/drink-water-api/
ssh $SERVER_ADDR "cd ~/drink-water-api && docker-compose -f $COMPOSE_FILE build app && docker-compose -f $COMPOSE_FILE up -d app"
