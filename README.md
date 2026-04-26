# 🎯 Hey Ya! — Gestão Inteligente de Rotina

<div align="center">

![Hey Ya! Banner](https://img.shields.io/badge/Hey%20Ya!-Gest%C3%A3o%20Inteligente-6C63FF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTEyIDJMNCA3djEwbDggNSA4LTV2LTEwTDEyIDJ6Ii8+PC9zdmc+&logoColor=white)

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-00D9FF?style=flat-square)
![Plataforma](https://img.shields.io/badge/Plataforma-Web%20%7C%20Android-6C63FF?style=flat-square)
![Licença](https://img.shields.io/badge/Licença-Acadêmica-00E676?style=flat-square)
![UNICID](https://img.shields.io/badge/Instituição-UNICID-FFB74D?style=flat-square)

**Um ecossistema inteligente que organiza sua vida profissional, acadêmica e pessoal com IA preditiva e gamificação.**

[🚀 Demo ao Vivo](#-como-executar) · [📋 Documentação](#-casos-de-uso) · [🏗️ Arquitetura](#%EF%B8%8F-arquitetura)

</div>

---

## 📖 Sobre o Projeto

O **Hey Ya!** é um aplicativo de gestão de rotina desenvolvido como projeto acadêmico na **UNICID**, projetado especialmente para:

- 🏥 **Profissionais em regime de escala** (12×36, plantões)
- 🎓 **Estudantes** com múltiplas atividades
- 💼 **Freelancers** com horários flexíveis

O sistema utiliza **Inteligência Artificial** (OpenAI API) para gerar cronogramas otimizados, sugerir janelas de descanso e prevenir burnout, tudo com um sistema de **gamificação** que mantém o usuário motivado.

---

## ✨ Funcionalidades Principais

| Funcionalidade | Descrição | UC |
|---|---|---|
| 🔐 **Autenticação** | Login com credenciais mockadas (`admin` / `1234`) | — |
| ⚙️ **Configurar Escala** | Definir regime de trabalho (12×36, 5×2, 6×1, Plantão, Flexível) | UC1 |
| 📋 **Gestão de Tarefas** | CRUD completo com título, descrição, prazo, categoria e prioridade | UC2-UC5 |
| 📊 **Dashboard** | Métricas de produtividade, gráficos por área (Estudo, Trabalho, Saúde) | UC6 |
| 🔄 **Sync Calendário** | Integração com calendários externos (Google Calendar, Outlook) | UC7 |
| 🤖 **Sugestões de IA** | Cronogramas otimizados e sugestões de descanso baseadas na escala | UC8, UC10 |
| 🏆 **Gamificação** | Sistema de XP, níveis e 8 badges desbloqueáveis | UC9 |
| 🗄️ **Persistência** | Dados persistidos em localStorage (mock MongoDB) | UC11 |

---

## 🏗️ Arquitetura

```
Hey Ya! — Ecossistema
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   👤 Usuário  │────▶│   📱 App Web  │────▶│ 🤖 OpenAI API│
│  (Ator Princ.)│     │  (Frontend)  │     │ (Ator Externo)│
└──────────────┘     └──────┬───────┘     └──────────────┘
                            │
                     ┌──────▼───────┐
                     │ 🗄️ MongoDB   │
                     │ (localStorage)│
                     └──────────────┘
```

### Stack Tecnológica

| Camada | Tecnologia | Propósito |
|---|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) | Interface do usuário |
| **Design** | CSS Variables, Glassmorphism, Inter Font | Design system premium dark mode |
| **Persistência** | localStorage (Mock MongoDB) | Armazenamento de dados |
| **IA** | Sugestões mockadas (simulação OpenAI) | Inteligência preditiva |

---

## 📐 Estrutura do Projeto

```
Projeto-Hey-Yah/
├── 📄 index.html          # Aplicação principal (SPA)
├── 📁 css/
│   └── 🎨 styles.css      # Design system completo
├── 📁 js/
│   └── ⚡ app.js           # Lógica do aplicativo
└── 📄 README.md            # Documentação
```

---

## 🚀 Como Executar

### Pré-requisitos
- Qualquer navegador moderno (Chrome, Firefox, Edge)
- Opcionalmente: [Node.js](https://nodejs.org) para servidor local

### Opção 1: Abrir direto no navegador
```bash
# Basta abrir o arquivo no navegador
start index.html
```

### Opção 2: Servidor local (recomendado)
```bash
# Clone o repositório
git clone https://github.com/Skyelima/Projeto-Hey-Yah.git
cd Projeto-Hey-Yah

# Inicie um servidor local
npx serve .

# Acesse http://localhost:3000
```

### 🔐 Credenciais de Acesso
| Usuário | Senha |
|---|---|
| `admin` | `1234` |

---

## 📋 Casos de Uso

### Diagrama de Casos de Uso

```
                         ┌─────────────────────────────────┐
                         │       Sistema Hey Ya!            │
                         │                                  │
  ┌──────┐    ┌──────────┤  UC1: Configurar Escala          │
  │      │    │          │  UC2: Gerenciar Tarefas           │
  │  👤   │───┤          │    ├── UC3: Criar Tarefa          │
  │Usuário│   │          │    ├── UC4: Editar Tarefa         │
  │      │   │          │    └── UC5: Excluir Tarefa        │
  └──────┘   │          │  UC6: Dashboard Produtividade     │
              │          │  UC7: Sincronizar Calendário      │
              │          │  UC8: Obter Sugestões IA ──extend──┐
              │          │  UC9: Gamificação                │  │
              └──────────┤                                  │  │
                         │  UC10: Processar com IA ◄────────┘  │──── 🤖 OpenAI
                         │  UC11: Armazenar Dados              │──── 🗄️ MongoDB
                         └─────────────────────────────────────┘
```

### Detalhamento dos Casos de Uso

<details>
<summary><strong>UC1 — Configurar Ciclo de Trabalho</strong></summary>

- **Ator:** Usuário
- **Descrição:** Define a escala de trabalho (12×36, 5×2, plantões esporádicos, flexível)
- **Resultado:** Sistema adapta sugestões e carga de tarefas conforme o ciclo configurado
- **RF Associado:** RF01 | Prioridade: 🔴 Alta
</details>

<details>
<summary><strong>UC2-UC5 — Gestão de Tarefas (CRUD)</strong></summary>

- **Ator:** Usuário
- **Operações:**
  - **UC3:** Criar Tarefa — título, descrição, prazo e categoria
  - **UC4:** Editar Tarefa — modificar prioridade, prazo, categoria
  - **UC5:** Excluir Tarefa — remover tarefa do sistema
- **RF Associado:** RF02 | Prioridade: 🔴 Alta
</details>

<details>
<summary><strong>UC6 — Dashboard de Produtividade</strong></summary>

- **Ator:** Usuário
- **Métricas:** Tempo por área, tarefas completadas vs pendentes, nível de gamificação, tendências
- **RF Associado:** RF04 | Prioridade: 🟡 Média
</details>

<details>
<summary><strong>UC8/UC10 — Inteligência Artificial</strong></summary>

- **Atores:** Usuário → Sistema → OpenAI API
- **Inputs:** Carga de tarefas, nível de cansaço, escala de trabalho, histórico
- **Outputs:** Janelas ótimas para estudo/descanso, reorganização de prioridades
- **Operações UC10:** Análise de padrões, detecção de sobrecarga (RN01), restrições de plantão (RN02), privacidade (RN03)
- **RF Associado:** RF03 | Prioridade: 🔴 Alta
</details>

<details>
<summary><strong>UC9 — Gamificação</strong></summary>

- **Ator:** Usuário
- **Sistema de pontos:** +25 XP (alta prioridade), +15 XP (média), +10 XP (baixa)
- **Níveis:** Iniciante → Aprendiz → Dedicado → Focado → Veterano → Mestre → Lendário
- **8 Badges:** Primeira Tarefa, 5 Concluídas, 10 Concluídas, Organizado, 3 Seguidas, Tech Savvy, Equilibrado, Veterano
- **RF Associado:** RF06 | Prioridade: 🟡 Média
</details>

---

## 📋 Requisitos

### Requisitos Funcionais

| ID | Requisito | Prioridade |
|---|---|---|
| RF01 | Configuração de Ciclo de Trabalho (12×36, 5×2, plantões) | 🔴 Alta |
| RF02 | Gestão de Tarefas — CRUD com título, descrição, prazo e categoria | 🔴 Alta |
| RF03 | Inteligência Preditiva — sugestões de estudo/descanso via IA | 🔴 Alta |
| RF04 | Dashboard de Produtividade com gráficos por área | 🟡 Média |
| RF05 | Sincronização de Calendário externo | 🟡 Média |
| RF06 | Gamificação com pontos e níveis | 🟡 Média |

### Requisitos Não Funcionais

| ID | Requisito |
|---|---|
| RNF01 | Compatível com Android 10.0+ |
| RNF02 | Persistência flexível orientada a documentos (JSON) |
| RNF03 | Processamento local instantâneo (exceto chamadas de IA) |
| RNF04 | Offline-First com sincronização automática |
| RNF05 | Interface seguindo Material Design 3 |

---

## 🏛️ Regras de Negócio

| Regra | Descrição | Severidade |
|---|---|---|
| **RN01** — Eisenhower | Máx. 3 tarefas "Urgente+Importante" por dia (prevenção de burnout) | 🔴 Crítica |
| **RN02** — Cálculo de Escala | Bloquear tarefas cognitivas pesadas após 8h em dia de plantão | 🟡 Alta |
| **RN03** — Privacidade | Sem PII na API — apenas contexto de tarefas (LGPD) | 🔴 Crítica |

---

## 🔄 Fluxos de Interação

### Fluxo 1: Ciclo Completo de Produtividade
```
Usuário → UC1 (Configura Ciclo)
        → UC2 (Cria Tarefas)
        → UC8 (Recebe Sugestões IA)
        → UC10 (IA processa contexto)
        → UC6 (Visualiza Progresso)
        → UC9 (Coleta Recompensas)
        → UC11 (Tudo persiste no BD)
```

### Fluxo 2: Integração com Calendário
```
Usuário → UC7 (Sincroniza Calendário)
        → UC2 (Ajusta Tarefas)
        → UC6 (Dashboard atualiza)
        → UC11 (Novos dados armazenados)
```

### Fluxos de Exceção
| Exceção | Tratamento |
|---|---|
| Sem conexão | Modo offline-first, sync ao retornar |
| Erro na API de IA | Usa último cronograma válido em cache |
| Falha de autenticação | Mensagem amigável, limite de 5 tentativas |
| Conflito de calendário | Alerta + sugestão de reagendamento |

---

## 🎨 Design System

O app utiliza um design system premium com **dark mode** e **glassmorphism**:

| Token | Valor | Uso |
|---|---|---|
| `--accent-primary` | `#6C63FF` | Ações principais |
| `--accent-secondary` | `#00D9FF` | Destaques |
| `--success` | `#00E676` | Status positivo |
| `--warning` | `#FFB74D` | Alertas |
| `--error` | `#FF5252` | Erros |

- **Tipografia:** Inter (Google Fonts) + JetBrains Mono
- **Efeitos:** Glassmorphism, gradientes, micro-animações
- **Responsivo:** Desktop, Tablet e Mobile com sidebar colapsável

---

## 👥 Stakeholders

| Stakeholder | Papel |
|---|---|
| **Usuário Final** | Estudantes, freelancers, profissionais em escala |
| **Equipe de Desenvolvimento** | Arquitetura Java/Android + MongoDB |
| **Provedores de Infra** | OpenAI (NLP), MongoDB Atlas, Google (Calendar) |
| **Avaliadores Acadêmicos** | Professores UNICID — validação de engenharia de software |

---

## ✅ Validação e Próximos Passos

Cada caso de uso será implementado como:
- ☕ **Classes Java:** Handlers e Controllers para lógica de negócio
- 🧪 **Testes Unitários:** Validação de cada fluxo crítico
- 🔗 **Testes de Integração:** Comunicação entre Usuário ↔ IA ↔ BD
- 📱 **UI Android:** Telas correspondentes a cada caso de uso

---

## 🛠️ Tecnologias Futuras (Versão Android)

| Tecnologia | Uso Planejado |
|---|---|
| Java | Linguagem principal (Android) |
| Android SDK | Interface nativa |
| MongoDB Atlas | Banco de dados em nuvem |
| OpenAI API | Processamento de linguagem natural |
| Google Calendar API | Sincronização de calendário |
| Material Design 3 | Padrão de interface |

---

## 📄 Licença

Este projeto é de uso **acadêmico** — desenvolvido como trabalho de graduação na **Universidade Cidade de São Paulo (UNICID)**.

---

<div align="center">

**Feito com 💜 por [Skyelima](https://github.com/Skyelima) — UNICID 2026**

![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=flat-square&logo=android&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

</div>
