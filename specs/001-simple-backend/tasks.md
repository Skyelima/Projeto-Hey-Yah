# Implementation Tasks: simple-backend

**Feature**: simple-backend
**Branch**: `001-simple-backend`

## Execution Strategy

- **MVP First**: Implementar a fundação de banco de dados e autenticação primeiro. A User Story 1 (Sincronização de Dados) é o core do MVP.
- **TDD / Testing**: Testes manuais locais utilizando ferramentas como Postman/Insomnia e o próprio frontend.

## Phase 1: Setup

- [x] T001 Criar estrutura Monorepo movendo arquivos atuais (html, css, js, assets, etc) para a pasta `frontend/`
- [x] T002 Inicializar projeto Node.js (`package.json`) na nova pasta `backend/` e instalar dependências: `express cors sqlite3 bcrypt jsonwebtoken dotenv`
- [x] T003 [P] Criar a estrutura de diretórios do servidor: `backend/src/config/`, `backend/src/controllers/`, `backend/src/models/`, `backend/src/routes/`
- [x] T004 Criar arquivo de variáveis de ambiente `backend/.env` com configuração de porta e `JWT_SECRET`
- [x] T005 Configurar a conexão do SQLite no arquivo `backend/src/config/database.js`
- [x] T006 Criar o ponto de entrada da API `backend/src/server.js` com Express, habilitando CORS e parser de JSON

## Phase 2: Foundational (Auth & Schema)

- [x] T007 Criar script de inicialização do banco de dados (tabelas `users`, `tasks`, `gamification`) em `backend/src/models/schema.js` e chamá-lo no `server.js`
- [x] T008 [P] Criar controlador de Autenticação `backend/src/controllers/authController.js` com as funções `register` e `login`
- [x] T009 [P] Criar as rotas de Autenticação em `backend/src/routes/authRoutes.js`
- [x] T010 Criar middleware de proteção de rotas `backend/src/config/authMiddleware.js` verificando token JWT

## Phase 3: Sincronização de Dados em Nuvem [US1]
**Goal**: Salvar e recuperar tarefas e progresso gamificado da nuvem.
**Test**: Criar tarefa via Postman/frontend e confirmar no banco de dados SQLite; carregar a página e ver os dados vindos do servidor.

- [x] T011 [P] [US1] Criar controlador `backend/src/controllers/taskController.js` com funções CRUD (getAll, create, update, delete) filtrando pelo `user_id` do token
- [x] T012 [P] [US1] Criar controlador `backend/src/controllers/gamificationController.js` para buscar e atualizar o XP do pet
- [x] T013 [P] [US1] Criar `backend/src/routes/taskRoutes.js` e associá-las ao `server.js` protegidas pelo `authMiddleware`
- [x] T014 [P] [US1] Criar `backend/src/routes/gamificationRoutes.js` e associá-las ao `server.js` protegidas pelo `authMiddleware`
- [x] T015 [US1] Atualizar o `frontend/js/app.js` para carregar as tarefas do endpoint `GET /api/tasks` caso o usuário esteja logado
- [x] T016 [US1] Atualizar `frontend/js/app.js` para salvar as alterações (criação e edição) via `POST` e `PUT /api/tasks`
- [x] T017 [US1] Atualizar `frontend/js/gamification.js` para sincronizar o ganho de XP enviando `PUT /api/gamification/xp`

## Phase 4: Notificações Push Amigáveis [US2]
**Goal**: Lembrar o usuário de suas tarefas em segundo plano de forma amigável.
**Test**: Executar o job manualmente e verificar saída no console ou mock de e-mail/notificação enviada para o usuário logado com tarefas atrasadas.

- [x] T018 [US2] Criar serviço de agendamento/jobs em `backend/src/jobs/notificationJob.js` usando `setInterval` ou `node-cron`
- [x] T019 [US2] Implementar lógica no `notificationJob.js` que busca usuários com tarefas pendentes com `prazo` para o dia atual e simula (console.log ou Mock) envio de lembrete
- [x] T020 [US2] Inicializar o job rodando em background no `server.js`

## Phase 5: IA Segura e Centralizada [US3]
**Goal**: Processar a inteligência de sugestões no lado do servidor, sem expor chaves no cliente e sem sobrecarregar o front.
**Test**: Clicar em "Gerar Sugestões Inteligentes" no frontend e verificar se a API retorna as sugestões formatadas.

- [x] T021 [P] [US3] Criar controlador `backend/src/controllers/aiController.js` que analisa as tarefas do usuário enviadas pelo front (ou buscadas do banco) e retorna as sugestões com a lógica de burnout (RN02 e regras empáticas)
- [x] T022 [P] [US3] Criar rota `POST /api/ai/suggestions` em `backend/src/routes/aiRoutes.js` e importar no `server.js`
- [x] T023 [US3] Refatorar função `generateAISuggestions` do `frontend/js/app.js` para chamar o endpoint do backend e exibir os resultados na tela em vez de processar localmente

## Phase 6: Polish

- [x] T024 Adicionar tratamento global de erros (middleware) no `backend/src/server.js` para padronizar respostas de falha (`500 Internal Server Error`)
- [x] T025 Atualizar interface do frontend para adicionar uma tela modal (ou formulário simples) de "Login / Cadastro", usando o token gerado.
