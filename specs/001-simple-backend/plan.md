# Implementation Plan: simple-backend

**Branch**: `001-simple-backend` | **Date**: 2026-04-29 | **Spec**: [spec.md](./spec.md)

## Summary

Implementar um backend simples utilizando Node.js e Express, com banco de dados SQLite para armazenar usuários, tarefas e o progresso gamificado (pet). Esse backend fornecerá APIs RESTful e centralizará a lógica pesada e credenciais (como a comunicação segura com IA externa).

## Technical Context

**Language/Version**: Node.js (v18+)
**Primary Dependencies**: Express.js, cors, sqlite3, bcrypt, jsonwebtoken, dotenv
**Storage**: SQLite
**Testing**: N/A (testes manuais recomendados inicialmente para focar no MVP)
**Target Platform**: Servidor/Nuvem (ex: Render, Vercel, Railway) e Local (localhost)
**Project Type**: REST API
**Performance Goals**: Tempo de resposta inferior a 200ms
**Constraints**: O backend e o frontend estarão no mesmo repositório inicialmente, divididos em pastas (`backend/` e `frontend/`)
**Scale/Scope**: MVP simples para uso pessoal ou pequenos grupos.

## Constitution Check

*GATE: Passed*

- **Simplicity**: Utilização de Express e SQLite sem ORMs pesados garante que a arquitetura continue leve e didática.

## Project Structure

### Documentation (this feature)

```text
specs/001-simple-backend/
├── plan.md              # This file
├── research.md          # Research on architecture
├── data-model.md        # Database schema
├── contracts/
│   └── api-spec.md      # API Endpoints
├── quickstart.md        # How to run backend
└── tasks.md             # To be generated
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── config/          # Configuração do DB e middlewares
│   ├── controllers/     # Lógica de manipulação de requisições
│   ├── models/          # Definições e queries SQLite
│   ├── routes/          # Rotas do Express
│   └── server.js        # Ponto de entrada do backend
├── .env                 # Variáveis de ambiente locais
└── package.json

frontend/
└── [código atual do Projeto Hey Ya (app.js, index.html, etc)]
```

**Structure Decision**: Option 2: Web application. Iremos mover o código atual que está na raiz para uma pasta `frontend/` e criar a pasta `backend/` para manter a organização limpa e modular, preparando o projeto para evoluir de forma profissional.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Múltiplos projetos | O projeto agora tem Backend e Frontend | Manter tudo junto sem backend impede a sincronização em nuvem e expõe chaves de IA no cliente, gerando falhas de segurança e perda de dados. |
