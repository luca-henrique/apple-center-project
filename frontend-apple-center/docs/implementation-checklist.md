# Implementation Checklist — Apple Center Frontend

Checklist de migração e alinhamento arquitetural do projeto `frontend-apple-center` com base nas diretrizes de [patter-fronend.md](./patter-fronend.md).

---

## 📌 Premissas Mandatórias
- [x] **English in Code**: Todo o código (nomes de arquivos, variáveis, funções, types, interfaces, comentários e commits) deve ser estritamente em **inglês**. O texto de UI permanece em pt-BR.
- [x] **Strict Patterns**: Seguir à risca a arquitetura **Feature-Sliced Design (FSD)** e **Atomic Design**.
- [x] **Zero `any`**: Tipagem estrita em TypeScript sem type assertions inseguras.
- [x] **DRY & SOLID**: Extração de componentes visuais repetidos e separação clara de responsabilidades (UI x Regra de Negócio x Schemas).

---

## 📦 Fase 1: Dependências e Configuração Base

- [x] **1.1. Instalação de Bibliotecas do Padrão**
  - [x] `@tanstack/react-query` & `@tanstack/react-query-devtools` (Server State)
  - [x] `react-hook-form` & `@hookform/resolvers` & `zod` (Formulários & Schemas)
  - [x] `sonner` (Notificações e Toasts)
- [x] **1.2. Configuração de Providers Globais (`src/app/providers.tsx`)**
  - [x] `QueryClientProvider` configurado com `staleTime`, `refetchOnWindowFocus: false`
  - [x] `<Toaster position="top-right" richColors />` do Sonner integrado no layout raiz (`src/app/layout.tsx`)
- [x] **1.3. Ajuste de Tokens no TailwindCSS 4 (`src/app/globals.css`)**
  - [x] Validar tokens `@theme` (`primary`, `surface`, `surface-container`, `on-surface`, `error`)
  - [x] Eliminar cores hexadecimais arbitrárias dispersas no código

---

## 🧱 Fase 2: Camada Compartilhada (`src/shared/`)

- [x] **2.1. Design System — Atoms (`src/shared/ui/`)**
  - [x] `typography.tsx`: Componente padronizado com variants (`title`, `subtitle`, `heading`, `body`, `caption`) e tags semânticas (`h1`, `p`, etc.)
  - [x] `button.tsx`: Suporte a `isLoading`, desativação contra múltiplos cliques, `variant` (`primary`, `secondary`, `outline`, `ghost`), touch target mínimo de 44x44px
  - [x] `badge.tsx`: Badges de condição, garantia e desconto Pix
  - [x] `skeleton.tsx`: Skeleton base para carregamentos assíncronos
  - [x] `input.tsx`: Input base acessível
- [x] **2.2. Design System — Molecules (`src/shared/ui/`)**
  - [x] `form-field.tsx`: Combinação de Label + Input + `errorText` acessível (`aria-describedby`, `aria-invalid`, `role="alert"`)
  - [x] `modal.tsx`: Modal acessível com backdrop, suporte a `ESC`, foco inicial, bloqueio de scroll do `body` e rolagem interna (`max-h-[90vh] overflow-y-auto`)
- [x] **2.3. Utilitários Centralizados de Formatação (`src/shared/lib/format/`)**
  - [x] `currency.ts`: `formatCurrency(val)` via `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`
  - [x] `document.ts`: Mascaramento de CEP e CPF
- [x] **2.4. Camada de API Base (`src/shared/api/`)**
  - [x] `httpClient.ts`: Cliente HTTP centralizado com tipagem genérica de resposta e interceptors de erro

---

## 🧩 Fase 3: Camada de Entidades (`src/entities/`)

- [x] **3.1. Entidade de Produto (`src/entities/product/`)**
  - [x] `model/types.ts`: Interfaces estritas em inglês (`Product`, `ProductColor`, `ProductStorageOption`, `InspectionItem`)
  - [x] `api/product-api.ts`: Funções de busca (`getProducts`, `getProductBySlug`)
  - [x] `api/use-products.ts`: Hooks TanStack Query (`useProducts`, `useProductBySlug`)
  - [x] `ui/product-card.tsx`: Card de produto atômico/molecular consumindo dados da entidade
- [x] **3.2. Entidade de Categoria (`src/entities/category/`)**
  - [x] `model/types.ts`: Interface `Category`
- [x] **3.3. Entidade de Avaliação (`src/entities/review/`)**
  - [x] `model/types.ts`: Interface `Review`
  - [x] `ui/review-card.tsx`: Card de avaliação individual

---

## ⚡ Fase 4: Camada de Features (`src/features/`)

- [x] **4.1. Filtro e Busca de Produtos (`src/features/filter-products/`)**
  - [x] `ui/category-chips.tsx`: Chips de categoria com touch target acessível
  - [x] `ui/search-filter-bar.tsx`: Input de busca com debounce e botão de acionamento do modal de filtros
  - [x] `ui/filter-modal.tsx`: Modal dedicado e acessível para filtragem por condição/preço
- [x] **4.2. Cálculo de Frete (`src/features/calculate-shipping/`)**
  - [x] `model/shipping.schema.ts`: Schema Zod para CEP (`z.string().regex(/^\d{5}-?\d{3}$/)`)
  - [x] `hooks/useShippingCalculator.ts`: Hook com React Hook Form + Zod
  - [x] `ui/shipping-calculator.tsx`: UI desacoplada com feedback de erro em `FormField`
- [x] **4.3. Seleção de Variações de Produto (`src/features/select-product-variant/`)**
  - [x] `ui/variant-selectors.tsx`: Seleção tátil de cores, capacidade e cálculo diferencial de preço
- [x] **4.4. Trade-in / Avaliação de Usado (`src/features/trade-in/`)**
  - [x] `ui/trade-in-banner.tsx`: Chamada para cotação
  - [x] `ui/trade-in-modal.tsx`: Modal interativo com etapas de cotação

---

## 🏛️ Fase 5: Camada de Widgets (`src/widgets/`)

- [x] **5.1. Header & Navegação**
  - [x] `src/widgets/header/ui/header.tsx`: Header fixo com logo, barra de status e carrinho
  - [x] `src/widgets/bottom-nav/ui/bottom-nav.tsx`: Barra de navegação móvel com touch target de 44px
- [x] **5.2. Vitrine e Destaques**
  - [x] `src/widgets/promo-banner/ui/promo-banner.tsx`
  - [x] `src/widgets/trust-badges/ui/trust-badges.tsx`
  - [x] `src/widgets/product-grid/ui/product-grid.tsx`: Grid responsivo com estados de `Skeleton` e `EmptyState`
  - [x] `src/widgets/reviews-section/ui/reviews-section.tsx`
  - [x] `src/widgets/inspection-teaser/ui/inspection-teaser.tsx`
- [x] **5.3. Página de Detalhe do Produto**
  - [x] `src/widgets/product-detail/ui/gallery-carousel.tsx`
  - [x] `src/widgets/product-detail/ui/pricing-card.tsx`
  - [x] `src/widgets/product-detail/ui/inspection-accordion.tsx`
  - [x] `src/widgets/product-detail/ui/bottom-action-bar.tsx`
  - [x] `src/widgets/product-detail/ui/detail-header.tsx`
  - [x] `src/widgets/product-detail/ui/product-detail-view.tsx`
- [x] **5.4. Página da Vitrine Principal**
  - [x] `src/widgets/storefront/ui/storefront-page.tsx`

---

## 📱 Fase 6: Responsividade, Auditoria e Acessibilidade (Mobile-First)

- [x] **6.1. Auditoria nos 4 Breakpoints Obrigatórios**
  - [x] **Mobile Web (360px a 390px)**: Zero scroll horizontal, padding mínimo de 16px, touch targets ≥ 44x44px
  - [x] **Tablet (768px a 820px)**: Grid em 2 colunas equilibradas, modais proporcionais
  - [x] **Desktop Padrão (1024px a 1366px)**: Container centralizado `max-w-7xl`, navegação ampla
  - [x] **Desktop Ultrawide (1440px+)**: Limitação de largura sem quebras assimétricas
- [x] **6.2. Documentação de Auditoria de Telas**
  - [x] Criado [`docs/bug-traceability/T-01-storefront.md`](./bug-traceability/T-01-storefront.md)
  - [x] Criado [`docs/bug-traceability/T-02-product-detail.md`](./bug-traceability/T-02-product-detail.md)

---

## 🔍 Fase 7: Qualidade, Build & Testes

- [x] Executar `npx tsc --noEmit` sem erros de tipagem
- [x] Validar rotas `/` e `/produto/[slug]` com HTTP 200 OK
- [x] Validar que o túnel Cloudflare opera com `allowedDevOrigins` configurado
