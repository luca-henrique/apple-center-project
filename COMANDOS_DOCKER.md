# 🐳 Comandos Docker e Cloudflare Tunnel — Apple Center

Este guia reúne todos os comandos práticos para gerenciar o contêiner do projeto seguindo a arquitetura descrita em `guia_de_arquitetura_docker_e_cloudflare_tunnel.md`.

---

## 🌐 1. Criação da Rede Virtual Compartilhada (Passo 1 do Guia)

Antes de subir qualquer contêiner pela primeira vez no servidor Debian ou ambiente local:

```bash
# Executar script utilitário automático:
./setup-network.sh

# Ou manualmente:
docker network create cloudflare_tunnel_network
```

---

## 🚀 2. Inicialização dos Contêineres

### Iniciar o Frontend em Produção (Isolado na rede interna)
```bash
docker compose up -d apple-center-frontend
```

### Iniciar com Quick Tunnel da Cloudflare (URL pública temporária `*.trycloudflare.com`)
Ideal para testar o site sem precisar configurar domínio no painel:
```bash
docker compose --profile quicktunnel up -d
```
Para ver a URL pública gerada:
```bash
docker compose logs -f quicktunnel-frontend
```

### Iniciar com o Túnel Oficial da Cloudflare (com `TUNNEL_TOKEN` no `.env`)
```bash
docker compose --profile tunnel up -d
```

---

## 📊 3. Monitoramento e Saúde

### Ver status dos contêineres e healthcheck
```bash
docker compose ps
```

### Acompanhar logs em tempo real
```bash
# Logs do frontend
docker compose logs -f apple-center-frontend

# Logs de todos os serviços
docker compose logs -f
```

### Inspecionar saúde do contêiner
```bash
docker inspect --format='{{json .State.Health.Status}}' apple-center-frontend
```

---

## 🔄 4. Rebuild e Atualização (Deploy Manual)

```bash
# Reconstruir a imagem e reiniciar o contêiner sem derrubar os outros
docker compose build apple-center-frontend
docker compose up -d --no-deps apple-center-frontend

# Limpar imagens antigas sem uso (dangling images)
docker image prune -f
```

---

## 🛑 5. Parar Serviços

```bash
# Parar apenas o frontend
docker compose stop apple-center-frontend

# Parar e remover contêineres
docker compose down
```

---

## ☁️ 6. Mapeamento no Painel Zero Trust da Cloudflare (Passo 5 do Guia)

No dashboard **Cloudflare Zero Trust** > **Networks** > **Tunnels** > **Public Hostnames**:

| Campo | Valor Recomendado |
|---|---|
| **Subdomain** | `applecenter` (ou seu subdomínio desejado) |
| **Domain** | `seudominio.com` |
| **Type** | `HTTP` |
| **URL** | `apple-center-frontend:3000` |

> ⚠️ **Importante**: O host apontado deve ser `apple-center-frontend:3000` (nome do contêiner na rede `cloudflare_tunnel_network`), **nunca** `localhost:3000` nem o IP da máquina, pois a porta 3000 não está mapeada no host Debian.
