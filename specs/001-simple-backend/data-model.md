# Data Model: Simple Backend

As tabelas serão criadas no arquivo SQLite local (`database.sqlite`).

## Entity: `User`
Tabela: `users`
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `email` (TEXT UNIQUE NOT NULL)
- `password_hash` (TEXT NOT NULL)
- `name` (TEXT)
- `escala` (TEXT DEFAULT 'flexivel')

## Entity: `Task`
Tabela: `tasks`
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `user_id` (INTEGER NOT NULL)
- `titulo` (TEXT)
- `descricao` (TEXT)
- `categoria` (TEXT)
- `prioridade` (TEXT)
- `prazo` (TEXT)
- `status` (TEXT DEFAULT 'pendente')
*Relacionamento*: `user_id` -> `users.id`

## Entity: `Gamification`
Tabela: `gamification`
- `user_id` (INTEGER PRIMARY KEY)
- `xp` (INTEGER DEFAULT 0)
- `estagioAtual` (INTEGER DEFAULT 0)
*Relacionamento*: `user_id` -> `users.id`
