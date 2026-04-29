# Gamification & Alerts Research

## 1. Gamification: Experience Curve
**Decision**: Usar uma curva de experiência linear simples para os primeiros 3 estágios.
**Rationale**: Em um app anti-burnout, a progressão não deve ser punitiva nem excessivamente demorada (grind). O usuário precisa de feedback rápido e constante. 
- Estágio 0 (Ovo): 0 XP
- Estágio 1 (Bebê Pinguim): 100 XP (ex: 10 tarefas concluídas)
- Estágio 2 (Pinguim Jovem): 300 XP
- Estágio 3 (Adulto): 600 XP
**Alternatives considered**: Curva exponencial (descartada pois causa frustração a longo prazo, o que vai contra a proposta anti-burnout).

## 2. In-App Alert System
**Decision**: Alertas visuais e amigáveis integrados ao próprio mascote (ex: o pinguim "segurando" um balão de diálogo).
**Rationale**: Resolve a questão levantada no spec (Push vs In-app). Notificações In-app são menos intrusivas e não interrompem a vida pessoal do usuário. O mascote entregar a mensagem suaviza o impacto de uma "tarefa atrasada".
- **Tone**: "Oi! Notei que temos tarefas de ontem. Quer reagendar para fazer com calma hoje?" em vez de "VOCÊ TEM 3 TAREFAS ATRASADAS".
**Alternatives considered**: Push notifications (descartado pelo potencial de gerar ansiedade e exigir permissões do SO).
