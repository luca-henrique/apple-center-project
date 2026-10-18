# 🚀 Guia de CI/CD — Apple Center

Este documento descreve o funcionamento do pipeline de **Integração Contínua (CI)** e **Implantação Contínua (CD)** do projeto Apple Center.

---

## 🏗️ 1. Visão Geral da Arquitetura

O pipeline automatiza os testes, build da imagem Docker e deploy no servidor Debian através da rede interna compartilhada com o Cloudflare Tunnel.

```mermaid
flowchart LR
    A[Git Push / PR] --> B[CI: Lint, Types & Next.js Build]
    B --> C[CI: Docker Buildx Check]
    C -->|Branch main/master| D[CD: Publish no GHCR]
    D -->|Se SSH Secrets configurados| E[CD: Deploy no Servidor Debian]
    E --> F[Healthcheck do Container]
```

---

## 📦 2. Etapas do Pipeline (`.github/workflows/ci-cd.yml`)

### 1. Quality & Next.js Build Check (CI)
Executado em todos os Pull Requests e Pushes:
- Instalação reproduzível de dependências com `npm ci`.
- Validação estrita de tipos com `npm run typecheck` (`tsc --noEmit`).
- Verificação de código com ESLint (`npm run lint`).
- Compilação de produção com Next.js (`npm run build`) utilizando cache nativo do GitHub Actions (`.next/cache`).

### 2. Docker Build & Publish (CI / CD)
- Constrói a imagem Docker multi-stage otimizada com `output: "standalone"`.
- Utiliza **Docker Buildx** e cache acelerado via GitHub Actions (`type=gha`).
- Publica a imagem no **GitHub Container Registry (GHCR)** sob `ghcr.io/<usuario>/apple-center-project:latest` e `:sha-<commit>`.

### 3. Automated Server Deployment via SSH (CD)
Disparado automaticamente após push na branch `main` ou `master`:
- Conecta no servidor Debian via SSH.
- Garante a presença da rede Docker compartilhada `cloudflare_tunnel_network`.
- Atualiza o contêiner `apple-center-frontend` de forma isolada com `docker compose build` e `docker compose up -d --no-deps`.
- Remove imagens órfãs (`docker image prune -f`).
- Valida o status do Healthcheck (`docker inspect`).

---

## 🔑 3. Configuração de Secrets no GitHub Repository

Para habilitar o deploy automático via SSH, configure em **Settings > Secrets and variables > Actions**:

| Nome do Secret | Descrição | Exemplo |
|---|---|---|
| `SSH_HOST` | IP público ou hostname do servidor Debian | `192.168.1.100` ou `debian.seuservidor.com` |
| `SSH_USER` | Usuário com permissão de Docker no servidor | `root` ou `debian` |
| `SSH_KEY` | Chave privada SSH (formato PEM / OpenSSH) | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `SSH_PORT` | Porta SSH (opcional, padrão `22`) | `22` |
| `DEPLOY_PATH` | Caminho do projeto no servidor Debian (opcional) | `/opt/apple-center-project` |

> ℹ️ **Nota**: Se os secrets `SSH_HOST` e `SSH_KEY` não estiverem configurados, o pipeline executará as etapas de testes e geração da imagem Docker com sucesso, pulando o deploy remoto de forma segura sem quebrar o fluxo.
