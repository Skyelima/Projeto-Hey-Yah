# Implementation Plan: gamification-alerts

**Branch**: `novas-ideias` | **Date**: 2026-04-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/novas-ideias/spec.md`

## Summary

Implementar um sistema de gamificação com um pet virtual (pinguim) que evolui com a conclusão de tarefas e um sistema de alertas amigáveis in-app para tarefas diárias/atrasadas, com o objetivo de reduzir o burnout e aumentar o engajamento através de reforço positivo.

## Technical Context

**Language/Version**: HTML5, CSS3, Vanilla JavaScript (ES6+)
**Primary Dependencies**: Nenhuma (Vanilla JS)
**Storage**: `localStorage` (como a principal fonte de dados para tarefas e perfil)
**Testing**: Testes manuais/funcionais no navegador (N/A testes automatizados no momento)
**Target Platform**: Navegadores Web (Desktop/Mobile responsivo)
**Project Type**: Web application (Frontend-only para esta feature)
**Performance Goals**: Animações suaves a 60fps para as interações do pet; carregamento em < 1s.
**Constraints**: UI deve ser responsiva; elementos visuais devem ter cores não agressivas (anti-burnout).
**Scale/Scope**: Feature contida inteiramente no frontend (`app.js`, `index.html`, `styles.css`).

## Constitution Check

*GATE: Passed*

- **Simplicity**: A solução utilizará Vanilla JS sem adição de bibliotecas externas complexas, mantendo o padrão atual do projeto.
- **Maintainability**: A lógica de gamificação (XP, evolução) e de notificações será modularizada em funções separadas no `app.js` ou em um novo script, evitando inflar ainda mais o código existente.

## Project Structure

### Documentation (this feature)

```text
specs/novas-ideias/
├── plan.md              # This file
├── research.md          # Research on gamification curves and alert tone
├── data-model.md        # Data structures for the virtual pet and alerts
├── quickstart.md        # How to test and run the new feature
└── tasks.md             # To be generated
```

### Source Code (repository root)

```text
Projeto hey ya/
├── index.html           # Adição do container do Pet e dos Alertas
├── css/
│   └── styles.css       # Estilos para o pet, animações, balões de alerta
├── js/
│   ├── app.js           # Integração principal, hook na conclusão de tarefas
│   └── gamification.js  # (Novo ou integrado) Lógica de cálculo de XP e estágios do pet
└── assets/              # (Novo) Imagens/SVGs dos estágios do pinguim (ovo, bebê, adulto)
```

**Structure Decision**: Adicionar as alterações nos arquivos existentes de UI, mas manter a lógica isolada em novas funções/módulos para não poluir o núcleo de gestão de tarefas.

## Complexity Tracking

Não aplicável - a abordagem escolhida é a mais simples (Vanilla JS + LocalStorage).
