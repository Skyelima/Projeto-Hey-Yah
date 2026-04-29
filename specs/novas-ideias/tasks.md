---
description: "Task list for gamification-alerts feature implementation"
---

# Tasks: gamification-alerts

**Input**: Design documents from `specs/novas-ideias/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Tests are OPTIONAL and not included since this is a vanilla JS UI project without an automated testing suite configured.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [P] Create `js/gamification.js` empty file and add `<script>` tag in `index.html`
- [x] T002 [P] Create `assets/` directory (if not exists) and add placeholder images for pet stages (`ovo.png`, `bebe.png`, `jovem.png`, `adulto.png`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T003 Expandir inicialização do `UserData` no `localStorage` em `js/app.js` para suportar o objeto `pet` e `ultimaNotificacao` conforme `data-model.md`.

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Virtual Pet Evolution (Priority: P1) 🎯 MVP

**Goal**: Permitir a adoção de um pet virtual que ganha XP e evolui ao concluir tarefas.

**Independent Test**: Marcar tarefas como concluídas e verificar se a XP aumenta e a imagem muda ao atingir os marcos (100, 300, 600).

### Implementation for User Story 1

- [x] T004 [US1] Adicionar container HTML para exibir o pet virtual (imagem e barra de XP) em `index.html`.
- [x] T005 [P] [US1] Adicionar estilos CSS base para o pet e barra de progresso em `css/styles.css`.
- [x] T006 [US1] Implementar funções de estado `addXP(amount)` e cálculo de nível (0, 100, 300, 600) em `js/gamification.js`.
- [x] T007 [US1] Integrar o hook na função que altera o status da tarefa em `js/app.js` para chamar `addXP(10)` de `js/gamification.js`.
- [x] T008 [US1] Implementar `renderPet()` em `js/gamification.js` para atualizar a UI do pet com base nos dados do LocalStorage.

**Checkpoint**: User Story 1 is functional. The pet evolves when tasks are completed.

---

## Phase 4: User Story 2 - Task Deadline Alerts (Priority: P1)

**Goal**: Exibir alertas amigáveis em formato de balão de fala do pet sobre prazos atrasados ou para hoje.

**Independent Test**: Criar uma tarefa atrasada e recarregar a página. Verificar se o balão empático aparece próximo ao pet.

### Implementation for User Story 2

- [x] T009 [US2] Adicionar container HTML para o balão de diálogo ao lado/embaixo do pet em `index.html`.
- [x] T010 [P] [US2] Estilizar o balão de fala para ter um visual acolhedor (cores pastéis, sem vermelho de "erro") em `css/styles.css`.
- [x] T011 [US2] Implementar função `checkAlerts()` em `js/gamification.js` que busca tarefas pendentes e seleciona uma mensagem amigável apropriada.
- [x] T012 [US2] Chamar `checkAlerts()` durante a inicialização (ex: `window.onload` ou na função init do `app.js`) em `js/app.js`.

**Checkpoint**: User Stories 1 AND 2 should both work independently.

---

## Phase 5: User Story 3 - Positive Reinforcement & Customization (Priority: P2)

**Goal**: Animações felizes e lógica de feedback para criar conexão emocional.

**Independent Test**: Ganhar XP deve exibir um efeito visual e acumular tarefas atrasadas deve mostrar o pet empático.

### Implementation for User Story 3

- [x] T013 [P] [US3] Adicionar classes de animação CSS simples (como um pulinho de sucesso e opacidade para o balão) em `css/styles.css`.
- [x] T014 [US3] Implementar função para aplicar a animação de sucesso no DOM ao chamar `addXP()` em `js/gamification.js`.
- [x] T015 [US3] Integrar a mensagem empática (tarefas atrasadas) ao hook de sugestões da IA (`generateAISuggestions()`) no `js/app.js`.

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T016 Refatorar código em `js/gamification.js` para garantir que `refreshGamification()` ou renderizações não causem loops.
- [x] T017 Verificar layout e responsividade do bloco do pet em dispositivos móveis no arquivo `css/styles.css`.
- [x] T018 Executar os passos descritos em `quickstart.md` para validação final.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup
- **User Stories (Phase 3+)**: All depend on Foundational phase
- **Polish (Final Phase)**: Depends on all stories completion

### User Story Dependencies

- **User Story 1 (P1)**: Independent MVP.
- **User Story 2 (P1)**: May integrate with US1 UI (balão no pet), but independent logic.
- **User Story 3 (P2)**: Extends US1 and US2 with animations.

### Parallel Opportunities

- HTML, CSS and JS logic can partially be developed in parallel for different user stories.
- Tasks marked with [P] (like adding empty files, assets, or CSS rules) can be executed concurrently without blocking.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup + Foundational.
2. Complete Phase 3 (US1).
3. Validar se o mascote ganha XP e muda a imagem.

### Incremental Delivery

1. Implement MVP (Pet Base).
2. Adicionar US2 (Alertas do pet).
3. Adicionar US3 (Animações de recompensa e integração com sugestões).
