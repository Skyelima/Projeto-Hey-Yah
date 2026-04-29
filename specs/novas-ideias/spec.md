# Feature Specification: gamification-alerts

**Feature Branch**: `[novas-ideias]`  
**Created**: 2026-04-29  
**Status**: Draft  
**Input**: User description: "tenho um projeto anti bornaut quero criar novas ideias, quero dicas para melhoria do meu sistema, tenho uma condição de gameficação queria cria um pet de evolução a cada tarefa ele ovinho  , o pinguin vai evoluindo, quais dicas vc da para o aplicativo ser algo mais legal quero um sistema de alerta tbm de prazo para o dia de fazer as tarefas  podemos cria um sistema de notificação de atraso me de todas as dicas boas"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Virtual Pet Evolution (Priority: P1)

Como usuário, quero adotar um pet virtual (pinguim) que começa como um ovo e evolui conforme eu completo minhas tarefas, para me manter motivado a combater o burnout sem sentir a pressão do trabalho.

**Why this priority**: A gamificação é o core do engajamento para um aplicativo anti-burnout. Um pet virtual transforma o processo de fazer tarefas em algo divertido e recompensador.

**Independent Test**: Pode ser testado ao marcar tarefas como concluídas e verificar se a barra de experiência/estágio do pet avança corretamente até a próxima evolução.

**Acceptance Scenarios**:

1. **Given** que o usuário é novo ou adotou um novo pet, **When** ele entra na tela do pet, **Then** ele vê um ovo.
2. **Given** que o usuário tem tarefas pendentes, **When** ele completa uma tarefa, **Then** o pet ganha pontos de experiência com uma animação de feedback positivo.
3. **Given** que o pet atingiu o limite de experiência da fase atual, **When** o usuário completa a tarefa, **Then** o pet evolui visualmente para a próxima fase (ex: de ovo para bebê pinguim).

---

### User Story 2 - Task Deadline Alerts (Priority: P1)

Como usuário, quero receber alertas amigáveis sobre o prazo das minhas tarefas do dia, para que eu possa me organizar sem esquecer nada, mas sem me sentir pressionado ou ansioso.

**Why this priority**: Ajuda o usuário a manter o foco e evitar acúmulo de tarefas, prevenindo o estresse. O tom do alerta é fundamental para um projeto anti-burnout.

**Independent Test**: Pode ser testado configurando uma tarefa para o dia atual e verificando se o sistema de alertas notifica o usuário no momento apropriado.

**Acceptance Scenarios**:

1. **Given** que há tarefas com prazo para hoje, **When** o usuário acessa o aplicativo ou no horário programado, **Then** um lembrete visual amigável (talvez o próprio pinguim) avisa sobre as tarefas do dia.
2. **Given** que uma tarefa está atrasada, **When** o usuário checa sua lista, **Then** a notificação não usa cores agressivas (como vermelho forte), mas sim uma linguagem acolhedora incentivando a reagendar ou focar nela, guiada pelo pet.

---

### User Story 3 - Positive Reinforcement & Customization (Priority: P2)

Como usuário, quero que meu pet virtual tenha animações felizes e possa ser customizado (ex: chapéus, cores) conforme eu uso o aplicativo, para criar laços emocionais com ele e ter mais vontade de voltar.

**Why this priority**: Elementos cosméticos adicionam diversão a longo prazo, sendo uma excelente dica para tornar o app "mais legal".

**Independent Test**: Pode ser testado equipando um item cosmético desbloqueado e verificando se o visual do pet é atualizado.

**Acceptance Scenarios**:

1. **Given** que o usuário completou várias tarefas em sequência (combo), **When** ele recebe sua recompensa, **Then** ele ganha uma roupinha ou item para o pinguim.
2. **Given** que o usuário está estressado (muitas tarefas acumuladas), **When** ele acessa o app, **Then** o pet exibe uma animação empática e sugere pausas ou remarcação de tarefas.

### Edge Cases

- What happens when o usuário completa todas as evoluções do pinguim? (Pode haver um sistema de prestígio, adoção de um novo pet, ou o pinguim vira um "mestre" que dá dicas).
- How does system handle tarefas atrasadas por muitos dias? (Deve evitar que o pet fique "doente" ou que isso gere ansiedade/punição no usuário; o foco deve ser sempre reforço positivo).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST permitir que o usuário possua um "Pet Virtual" (pinguim) vinculado à sua conta/estado atual.
- **FR-002**: O sistema MUST conceder "pontos de experiência" (XP) ao pet sempre que o usuário concluir uma tarefa.
- **FR-003**: O sistema MUST alterar o estágio visual do pet (ex: ovo -> filhote -> adulto) ao atingir marcos de XP predefinidos.
- **FR-004**: O sistema MUST identificar tarefas cujo prazo seja a data de hoje.
- **FR-005**: O sistema MUST exibir uma notificação ou alerta amigável (não intrusivo/não punitivo) sobre tarefas do dia e tarefas atrasadas.
- **FR-006**: O sistema MUST [NEEDS CLARIFICATION: Definir se as notificações de atraso serão push notifications (fora do app) ou apenas in-app (dentro da interface do site/app)].

### Key Entities

- **VirtualPet**: Representa o companheiro gamificado do usuário. (Atributos lógicos: estágio, experienciaAtual, nivel).
- **Task (Atualização)**: A tarefa agora precisa estar ligada à lógica de XP (ex: tarefas de maior prioridade dão mais XP?).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Aumento da taxa de tarefas concluídas (em comparação com o período antes da gamificação).
- **SC-002**: Usuários reportam uma redução no sentimento de culpa ao lidar com tarefas atrasadas (feedback qualitativo).
- **SC-003**: O engajamento com o app (retenção diária) aumenta após a introdução do pinguim.
- **SC-004**: As notificações amigáveis são lidas ou resultam em ações de remarcação/conclusão de tarefas em 80% das vezes em que são exibidas.

## Assumptions

- O aplicativo é focado em bem-estar e prevenção de burnout, portanto, toda comunicação, gamificação e sistemas de notificação serão desenhados com princípios de psicologia positiva. Não haverá perda de pontos ou "morte" do pet.
- A gamificação inicial se concentra em apenas um tipo de pet (Pinguim).
- As notificações não devem sobrecarregar o usuário; a frequência será calibrada.
