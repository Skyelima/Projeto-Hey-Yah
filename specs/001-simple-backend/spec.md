# Feature Specification: simple-backend

**Feature Branch**: `[001-simple-backend]`  
**Created**: 2026-04-29  
**Status**: Draft  
**Input**: User description: "que tipo de back end simples poderiamos criar? de ideias"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sincronização de Dados em Nuvem (Priority: P1)

Como usuário, quero que minhas tarefas e o progresso do meu pet virtual sejam salvos automaticamente na nuvem, para que eu possa acessar o aplicativo no meu celular ou no computador de trabalho sem perder nada.

**Why this priority**: A perda de progresso pode gerar frustração, o que vai contra os princípios de um app anti-burnout. A sincronização garante que a experiência seja contínua.

**Independent Test**: Pode ser testado criando uma tarefa no celular (ou simulador), fazendo login em outro navegador e verificando se a tarefa e a XP do pet aparecem imediatamente.

**Acceptance Scenarios**:

1. **Given** que o usuário está online e faz uma alteração, **When** ele conclui uma tarefa, **Then** o sistema sincroniza a mudança com o servidor de forma invisível.
2. **Given** que o usuário abre o aplicativo em um novo dispositivo, **When** ele faz login, **Then** todos os seus dados (perfil, tarefas, pet) são carregados do backend.

---

### User Story 2 - Notificações Push Amigáveis (Priority: P2)

Como usuário, quero receber lembretes gentis mesmo quando o aplicativo não estiver aberto, para que eu me lembre de revisar minhas tarefas do dia sem me sentir pressionado.

**Why this priority**: Permite que o pinguim "mande mensagens" para o usuário ao longo do dia. O backend é essencial para agendar e disparar push notifications reais.

**Independent Test**: Pode ser testado criando uma tarefa para hoje e verificando se o servidor dispara uma notificação (Push/E-mail amigável) no horário definido.

**Acceptance Scenarios**:

1. **Given** que há tarefas planejadas para o dia, **When** chega o horário comercial, **Then** o sistema de backend envia uma notificação lembrando suavemente das tarefas.

---

### User Story 3 - IA Segura e Centralizada (Priority: P2)

Como usuário, quero receber conselhos personalizados sobre a minha rotina, baseados em todo meu histórico, sem que o app pese no meu dispositivo.

**Why this priority**: Processar a lógica de IA (anti-burnout, análise de carga cognitiva) no backend permite usar modelos mais avançados, manter as chaves de API secretas e poupar a bateria do dispositivo do usuário.

**Independent Test**: Solicitar uma sugestão da IA e verificar se a resposta é processada pelo backend e entregue ao frontend.

**Acceptance Scenarios**:

1. **Given** que o usuário clica em "Gerar Sugestões Inteligentes", **When** o frontend solicita dados, **Then** o backend analisa o banco de dados e retorna insights baseados no padrão histórico de trabalho.

### Edge Cases

- What happens when o usuário perde a conexão de internet? O app deve funcionar localmente (offline-first) e sincronizar quando a conexão voltar.
- How does system handle conflitos de sincronização se o usuário alterar a mesma tarefa em dois dispositivos simultaneamente?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST permitir autenticação simples de usuários (ex: e-mail/senha ou OAuth via Google/GitHub).
- **FR-002**: O sistema MUST armazenar de forma persistente os dados de `UserData`, `Pet` e `Tasks` associados à conta do usuário.
- **FR-003**: O sistema MUST fornecer endpoints (API) para operações CRUD de tarefas e atualização do progresso gamificado (XP).
- **FR-004**: O sistema MUST proteger qualquer chamada a APIs de Inteligência Artificial externas, mantendo as chaves privadas no lado do servidor.
- **FR-005**: O sistema MUST ser implementado utilizando Node.js (Express) e SQLite para manter a simplicidade e permitir fácil integração com a lógica atual em JavaScript.

### Key Entities

- **User**: Representa a conta autenticada (e-mail, senha_hash, preferências).
- **Session**: Token de acesso para validar requisições.
- **TaskState**: A representação da tarefa no banco de dados.
- **GamificationProfile**: Os dados sincronizados do pet (XP, nível, etc).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Redução a zero da perda de dados de usuários ao limpar o cache do navegador.
- **SC-002**: Tempo de resposta das operações da API (sincronização) inferior a 200ms para garantir que a experiência pareça local.
- **SC-003**: Capacidade de enviar notificações externas sem necessidade do app estar aberto.

## Assumptions

- O aplicativo passará a exigir login (atualmente as credenciais são mockadas) para associar as tarefas aos usuários no banco de dados.
- A comunicação entre o site atual e o backend será feita via REST API simples.
