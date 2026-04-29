# Simple Backend Research

## 1. Database Choice
**Decision**: SQLite
**Rationale**: Por ser um MVP de um app anti-burnout pessoal, não precisamos de um banco de dados hospedado complexo. O SQLite roda em um arquivo local, facilitando incrivelmente o desenvolvimento e o deploy simplificado.
**Alternatives considered**: MongoDB (requer setup adicional e hospedagem própria tipo Atlas), PostgreSQL (pesado para o MVP inicial).

## 2. Authentication
**Decision**: JWT (JSON Web Tokens) com bcrypt
**Rationale**: Padrão de mercado para APIs RESTful. Leve, sem estado no servidor, e não requer gerenciamento de sessão complexa. O bcrypt protege as senhas no SQLite.

## 3. Arquitetura do Repositório
**Decision**: Monorepo Simples (`backend/` e `frontend/`)
**Rationale**: Mantém tudo no mesmo lugar para facilitar o versionamento e o deploy simultâneo, sendo essencial para um desenvolvedor manter a visão global do sistema. Mover os arquivos atuais (html/css/js) para `frontend/` organizará melhor a estrutura.
