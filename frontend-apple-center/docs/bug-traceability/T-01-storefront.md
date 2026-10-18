# Auditoria Visual & Rastreabilidade de Bugs — Tela T-01: Storefront (Vitrine Principal)

- **Rota:** `/`
- **Data da Auditoria:** 17/10/2026
- **Status Geral:** 🟢 Aprovado

---

## 📐 Inspeção pelos 4 Breakpoints Obrigatórios

### 1. Mobile Web (360px a 390px)
- [x] Zero rolagem horizontal involuntária (`overflow-x: hidden`).
- [x] Padding horizontal mínimo de 16px (`px-gutter`).
- [x] Touch targets respeitando a dimensão mínima de 44x44px em botões e chips de categoria.
- [x] Barra de navegação inferior móvel (`BottomNav`) adaptada com `pb-safe`.
- [x] Modal de filtros ocupando largura total fluida com rolagem interna suave.

### 2. Tablet (768px a 820px)
- [x] Grid de produtos adaptado fluidamente em 2 colunas proporcionais.
- [x] Header com distribuição harmônica entre logo, ajuda e carrinho.
- [x] Trust badges organizados em grid harmônico de 2 a 4 colunas.

### 3. Desktop Padrão (1024px a 1366px)
- [x] Grid de produtos organizado em 3 colunas balanceadas.
- [x] Alinhamento centralizado com container `max-w-7xl mx-auto`.
- [x] Exibição de contagem de aparelhos ativos e destaques com hover states suaves.

### 4. Desktop Ultrawide (1440px+)
- [x] Limitação máxima de largura preservando legibilidade e sem distorção dos cards.
- [x] Espaçamentos simétricos e banners centralizados.

---

## 📋 Registro de Bugs Encontrados nesta Tela

Nenhum bug impeditivo detectado. A arquitetura FSD e os componentes atômicos/moleculares garantem consistência visual e acessibilidade.
