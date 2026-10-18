#!/bin/bash
set -e

NETWORK_NAME="cloudflare_tunnel_network"

echo "🔍 Verificando se a rede Docker '$NETWORK_NAME' já existe..."

if docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
  echo "✅ A rede Docker compartilhada '$NETWORK_NAME' já existe."
else
  echo "🚀 Criando a rede Docker compartilhada '$NETWORK_NAME' (tipo bridge)..."
  docker network create "$NETWORK_NAME"
  echo "✅ Rede '$NETWORK_NAME' criada com sucesso!"
fi
