#!/usr/bin/env bash
# logs.sh

ENV=$1
SERVICE=$2
SERVER_ADDR=$3

if [[ -z "$ENV" ]]; then
  echo "Please specify an environment: dev or test."
  exit 1
fi

if [[ -z "$SERVICE" ]]; then
  echo "Please specify a service: app or db."
  exit 1
fi

if [[ -z "$SERVER_ADDR" ]]; then
  echo "Please specify a server address (e.g. eduardokohn@192.168.15.5)."
  exit 1
fi

# Define container names based on the environment and service
if [[ "$ENV" == "dev" ]]; then
  if [[ "$SERVICE" == "app" ]]; then
    CONTAINER_NAME="drinkwater_app_dev"
  elif [[ "$SERVICE" == "db" ]]; then
    CONTAINER_NAME="drinkwater_db_dev"
  fi
elif [[ "$ENV" == "test" ]]; then
  if [[ "$SERVICE" == "app" ]]; then
    CONTAINER_NAME="drinkwater_app_test"
  elif [[ "$SERVICE" == "db" ]]; then
    CONTAINER_NAME="drinkwater_db_test"
  fi
else
  echo "Invalid environment. Only dev or test is allowed."
  exit 1
fi

# Connect to the remote server and fetch logs
ssh $SERVER_ADDR "docker logs -f $CONTAINER_NAME"

# Check the exit status of ssh
SSH_EXIT_STATUS=$?
if [[ $SSH_EXIT_STATUS -ne 0 ]]; then
  # If logs command fails, wait for 10 seconds and then try again once
  echo "Lost connection to $CONTAINER_NAME logs. Reconnecting in 10 seconds..."
  sleep 10
  ssh $SERVER_ADDR "docker logs -f $CONTAINER_NAME"

  SSH_EXIT_STATUS=$?
  if [[ $SSH_EXIT_STATUS -ne 0 ]]; then
    echo "Failed to reconnect to $CONTAINER_NAME logs. Exiting..."
    exit 1
  fi
fi
