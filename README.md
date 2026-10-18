# 🍎 Apple Center Project

Projeto web construído com **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4** e **TypeScript**, containerizado com **Docker**, orquestrado via **Docker Compose** e integrado à arquitetura de **Cloudflare Tunnel** (sem exposição de portas no host Debian).

---

## 📁 Estrutura do Repositório

- [`frontend-apple-center/`](frontend-apple-center/): Aplicação Next.js 16, Tailwind CSS v4, Dockerfile multi-stage.
- [`docker-compose.yml`](docker-compose.yml): Orquestrador Docker com rede compartilhada e perfis de túnel Cloudflare.
- [`setup-network.sh`](setup-network.sh): Script utilitário para criação da rede Docker compartilhada `cloudflare_tunnel_network`.
- [`COMANDOS_DOCKER.md`](COMANDOS_DOCKER.md): Guia prático de comandos Docker e gerenciamento do túnel Cloudflare.
- [`CI_CD.md`](CI_CD.md): Documentação detalhada dos pipelines de CI/CD (GitHub Actions, GHCR e Deploy SSH).
- [`guia_de_arquitetura_docker_e_cloudflare_tunnel.md`](guia_de_arquitetura_docker_e_cloudflare_tunnel.md): Especificação arquitetural de isolamento de portas e Cloudflare Tunnel.

---

## 🚀 Início Rápido

### 1. Criar a rede Docker compartilhada
```bash
./setup-network.sh
```

### 2. Iniciar a aplicação
```bash
docker compose up -d apple-center-frontend
```

Consulte [COMANDOS_DOCKER.md](COMANDOS_DOCKER.md) para todos os comandos de operação e [CI_CD.md](CI_CD.md) para a esteira de automação.
