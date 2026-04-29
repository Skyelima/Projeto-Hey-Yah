# API Contracts (Endpoints)

Todas as rotas da API (exceto autenticação) exigem o cabeçalho:
`Authorization: Bearer <TOKEN_JWT>`

## Autenticação

### `POST /api/auth/register`
**Body**:
```json
{
  "email": "user@test.com",
  "password": "123",
  "name": "Kamila"
}
```

### `POST /api/auth/login`
**Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1...",
  "user": { "id": 1, "name": "Kamila" }
}
```

## Tarefas (Tasks)

### `GET /api/tasks`
Retorna um array com todas as tarefas vinculadas ao `user_id` logado.

### `POST /api/tasks`
Cria uma tarefa.
**Body**:
```json
{
  "titulo": "Estudar backend",
  "categoria": "estudo",
  "prioridade": "alta",
  "prazo": "2026-04-30"
}
```

### `PUT /api/tasks/:id`
Atualiza o status ou dados de uma tarefa.

### `DELETE /api/tasks/:id`
Deleta uma tarefa específica.

## Gamificação (Pet)

### `GET /api/gamification`
Retorna o progresso atual do pet virtual.

### `PUT /api/gamification/xp`
Adiciona XP ao pet do usuário logado.
**Body**:
```json
{
  "amount": 10
}
```
