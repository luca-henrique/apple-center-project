# Auditoria Visual & Rastreabilidade de Bugs — Tela T-04: Trade-In (Troca Garantida em 4 Etapas)

- **Rota:** `/trade-in`
- **Data da Auditoria:** 18/10/2026
- **Status Geral:** 🟢 Aprovado (Fluxo Completo de 4 Etapas Implementado)

---

## 🧭 Visão Geral do Fluxo em 4 Etapas (FSD & Mobile-First)

1. **Etapa 1: Cotação Inicial (`step-1-trade-in.mobile.html`)**
   - Header dinâmico com título Apple Certified Trade In, botão de notificações Sonner e avatar.
   - Hero com pitch de economia circular e selo tech.
   - Stepper oficial com 4 fases interativas e identificador de protocolo (`#TRD-89420`).
   - Formulário com seleção de modelo (iPhone 12 ao 15 Pro), 3 graus cosméticos e 2 faixas de saúde de bateria.
   - Card de cotação com valor recalculado em tempo real e escolha de destino (Crédito na Loja com R$ 300 de bônus vs Pix em conta).
   - Seção "Como funciona" e banner de garantia de devolução sem custos.
   - CTA inferior fixo com transição suave para a Etapa 2.

2. **Etapa 2: Dados do Proprietário & Envio Grátis (`step-2-trade-in.mobile.html`)**
   - Resumo compacto com trava de cotação por 7 dias, thumbnail do aparelho e selo de seguro Porto Seguro coberto.
   - Seletor de modalidade de pagamento (Crédito ou Pix com formulário sanfonado de chaves Celular, CPF, E-mail e Aleatória com badge de validação).
   - Formulário de dados do proprietário (Nome, CPF Receita Federal, WhatsApp para alertas e E-mail para laudo PDF).
   - Endereço de postagem com indicação automática da agência dos Correios recomendada mais próxima (a 350m).
   - Checkboxes obrigatórias de conformidade legal: declaração de procedência/IMEI limpo e compromisso de desativar o "Buscar iPhone" (Find My).
   - CTA fixo inferior "Gerar Etiqueta de Envio Grátis" com spinner de emissão e avanço para a Etapa 3.

3. **Etapa 3: Laudo Técnico Laboratorial (`step-3-trade-in.mobile.html`)**
   - Card de destaque com status "Avaliação Concluída • Cotação 100% Confirmada" por Perito Certificado CREA-SP e live ping de registro.
   - Resumo pericial do aparelho com nota máxima (Grau Excelente A+, Bateria 88%).
   - Comparativo financeiro entre Crédito (R$ 3.240,00) e Pix (R$ 2.940,00).
   - Checklist de 35 pontos laboratoriais divididos em 4 blocos retráteis (Biometria & Display, Câmeras & Sensores, Placa Lógica & Energia, Segurança & Homologação) com botão "Expandir/Recolher Tudo".
   - Card de vistoria filmada em bancada estéril (03:42 • 1080p 60fps) com player interativo autenticado.
   - Selo de autenticidade criptográfica com hash SHA256 e download imediato do laudo em PDF.
   - CTA fixo inferior "Aceitar Laudo e Liberar Valor" com confirmação assíncrona para a Etapa 4.

4. **Etapa 4: Resgate & Crédito Liberado (`step-4-trade-in.mobile.html`)**
   - Stepper 100% concluído em verde com badge "Resgatado".
   - Hero de celebração com protocolo oficial `#TRD-89420` e data.
   - Card de Vale-Crédito Ativo com cupom promocional `TRADEIN-LUCAS-89420` com funcionalidade de cópia para área de transferência em 1 clique e feedback instantâneo.
   - Alternativa de saque rápido via Pix direto em conta.
   - Vitrine de Upgrade Inteligente com desconto do trade-in já subtraído (ex: iPhone 15 Pro Max de R$ 6.676,10 por R$ 3.436,10 e iPhone 14 Pro de R$ 4.890,00 por R$ 1.650,00) com botão "Aplicar Crédito e Comprar" que redireciona diretamente ao checkout com desconto injetado.
   - Termo de quitação jurídica e recibo `Recibo-TradeIn-89420.pdf` (142 KB assinado digitalmente) para download.
   - Botões de navegação para marketplace, retorno à home e suporte concierge via WhatsApp.

---

## 📐 Inspeção pelos 4 Breakpoints Obrigatórios

- [x] **Mobile Web (360px a 390px):** Touch targets ≥ 44px, botões fixos em `pb-safe`, scroll horizontal desativado (`w-full overflow-x-hidden`).
- [x] **Tablet (768px a 820px):** Container equilibrado em `max-w-xl mx-auto`, tipografia proporcional.
- [x] **Desktop Padrão (1024px a 1366px):** Layout centralizado focado na conversão, efeitos hover em botões, accordions e cards interativos.
- [x] **Desktop Ultrawide (1440px+):** Escala harmoniosa sobre fundo `bg-surface`.

---

## 🏗️ Arquitetura & Padrões (patter-fronend.md)

- [x] **Regra de Ouro dos Componentes (Seção 18 - máx. 120 linhas):** Todos os 35+ arquivos de componentes e hooks do trade-in possuem estritamente menos de 120 linhas:
  - `src/app/trade-in/page.tsx`: 30 linhas
  - `src/widgets/trade-in/ui/trade-in-view.tsx`: 119 linhas
  - `src/widgets/trade-in/ui/trade-in-step-one.tsx`: 85 linhas
  - `src/widgets/trade-in/ui/trade-in-step-two.tsx`: 85 linhas
  - `src/widgets/trade-in/ui/trade-in-step-three.tsx`: 78 linhas
  - `src/widgets/trade-in/ui/trade-in-step-four.tsx`: 73 linhas
  - `src/widgets/trade-in/ui/trade-in-simulator-form.tsx`: 58 linhas
  - `src/widgets/trade-in/ui/trade-in-valuation-card.tsx`: 77 linhas
  - `src/widgets/trade-in/ui/atoms/trade-in-model-selector.tsx`: 81 linhas
  - `src/widgets/trade-in/ui/atoms/trade-in-condition-selector.tsx`: 80 linhas
  - `src/widgets/trade-in/ui/atoms/trade-in-battery-selector.tsx`: 67 linhas
  - `src/widgets/trade-in/ui/atoms/trade-in-payout-option.tsx`: 64 linhas
  - `src/widgets/trade-in/ui/step-two/step-two-quote-summary.tsx`: 82 linhas
  - `src/widgets/trade-in/ui/step-two/step-two-payout-selector.tsx`: 68 linhas
  - `src/widgets/trade-in/ui/step-two/step-two-payout-card-item.tsx`: 74 linhas
  - `src/widgets/trade-in/ui/step-two/step-two-pix-fields.tsx`: 60 linhas
  - `src/widgets/trade-in/ui/step-two/step-two-owner-card.tsx`: 74 linhas
  - `src/widgets/trade-in/ui/step-two/step-two-address-and-legal.tsx`: 89 linhas
  - `src/widgets/trade-in/ui/step-two/step-two-legal-terms.tsx`: 48 linhas
  - `src/widgets/trade-in/ui/step-two/step-two-bottom-cta.tsx`: 48 linhas
  - `src/widgets/trade-in/ui/step-three/step-three-status-card.tsx`: 33 linhas
  - `src/widgets/trade-in/ui/step-three/step-three-valuation-summary.tsx`: 115 linhas
  - `src/widgets/trade-in/ui/step-three/step-three-inspection-accordion.tsx`: 100 linhas
  - `src/widgets/trade-in/ui/step-three/step-three-video-and-seal.tsx`: 117 linhas
  - `src/widgets/trade-in/ui/step-three/step-three-actions.tsx`: 46 linhas
  - `src/widgets/trade-in/ui/step-four/step-four-hero.tsx`: 45 linhas
  - `src/widgets/trade-in/ui/step-four/step-four-voucher-card.tsx`: 104 linhas
  - `src/widgets/trade-in/ui/step-four/step-four-upgrade-suggestions.tsx`: 104 linhas
  - `src/widgets/trade-in/ui/step-four/step-four-concierge-actions.tsx`: 103 linhas
  - `src/features/trade-in/hooks/use-trade-in.ts`: 109 linhas
  - `src/features/trade-in/model/trade-in.calculations.ts`: 42 linhas
- [x] **Atomic Design & FSD:** Separação estrita de cálculos monetários em `trade-in.calculations.ts`, esquemas de dados em `trade-in.schema.ts`, hook orquestrador `use-trade-in.ts` e decomposição em átomos e moléculas especializadas.
- [x] **Acessibilidade & Tokens Canônicos:** Substituição de gradientes antigos por `bg-linear-to-br` e `bg-linear-to-bl`, `min-h-13` para alvos de clique, `h-px` em separadores e áreas de toque de no mínimo 44x44px.

