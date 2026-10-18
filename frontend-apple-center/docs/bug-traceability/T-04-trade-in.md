# Auditoria Visual & Rastreabilidade de Bugs — Tela T-04: Trade-In (Troca Garantida)

- **Rota:** `/trade-in`
- **Data da Auditoria:** 18/10/2026
- **Status Geral:** 🟢 Aprovado

---

## 📐 Inspeção pelos 4 Breakpoints Obrigatórios

### 1. Mobile Web (360px a 390px)
- [x] Header fixo com safe-area padding (`pt-safe`), marca Apple Certified Trade In, botão de notificações com feedback Sonner e avatar.
- [x] Card Hero com pitch emocional ("Troque seu iPhone usado por um novinho com desconto imediato"), selo circular tech e glow suave de fundo.
- [x] Indicador de progresso em 3 passos com badge numérico e barras sincronizadas.
- [x] Formulário do simulador em 3 etapas claras:
  - **Passo 1 (Modelo & Capacidade):** Dropdown com 7 modelos (iPhone 12 ao 15 Pro), miniatura de foto e badge "Homologado Anatel".
  - **Passo 2 (Estado Cosmético):** 3 botões seletores com áreas de toque ≥ 52px ("Perfeito", "Bom", "Com detalhes"), ícones semânticos e checkmark verde ativo.
  - **Passo 3 (Saúde da Bateria):** Seletor 2 colunas com áreas de toque ≥ 52px ("Acima de 85%" e "Abaixo de 85%").
- [x] Card de Avaliação com fundo gradiente floresta (`from-primary-container via-tertiary-container to-primary`), badge pulsante de "Válido por 7 dias" e valor recalculado em tempo real.
- [x] Seleção de modalidade de resgate:
  - **Crédito no novo iPhone:** + R$ 200 de bônus exclusivo com aplicação imediata.
  - **Pix na conta:** Pagamento direto via transferência após validação em laboratório.
- [x] Seção "Como funciona o processo" com 3 etapas didáticas e ícones ilustrativos.
- [x] Banner de garantia: devolução grátis sem custos se o estado real divergir do simulado.
- [x] Botão principal "Continuar com Trade-in" com spinner de loading, prevenção de duplo clique e contador social "Mais de 12.000 iPhones avaliados este mês".
- [x] Navegação inferior (`BottomNav`) ativa com aba "Trade-in" e touch targets ≥ 48px.
- [x] Zero transbordo horizontal (`max-w-xl mx-auto` com padding de segurança).

### 2. Tablet (768px a 820px)
- [x] Layout bento centralizado com margens fluidas.
- [x] Seletor de modelos com área de toque espaçosa e alinhamento visual equilibrado.
- [x] Cards de bateria em grid simétrica de 2 colunas.

### 3. Desktop Padrão (1024px a 1366px)
- [x] Container centralizado (`max-w-xl mx-auto`) mantendo foco total no funil de conversão.
- [x] Efeitos de hover suaves em todos os botões de condição cosmética, bateria e modalidade de recebimento.

### 4. Desktop Ultrawide (1440px+)
- [x] Fundo neutro `bg-surface` sem quebras de layout.
- [x] Imagens nítidas e legibilidade tipográfica preservada.

---

## 📋 Registro de Bugs Encontrados nesta Tela

Nenhum bug impeditivo detectado. Todos os cálculos de depreciação e bonificação (Multiplicador de Estado x Multiplicador de Bateria + R$ 200 de Bônus de Crédito) conferem exatamente com a especificação do mockup original.
