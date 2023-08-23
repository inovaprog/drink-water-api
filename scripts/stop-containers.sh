#!/usr/bin/env bash
# stop-containers.sh

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

# Definindo o nome do arquivo docker-compose com base no ambiente
COMPOSE_FILE="docker-compose.$ENV.yaml"

# Executando docker-compose down para o arquivo especificado
ssh $SERVER_ADDR "cd ~/drink-water-api && docker-compose -f $COMPOSE_FILE down"
