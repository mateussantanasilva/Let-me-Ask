# 🚀 NLW Agents

> **Uma plataforma inteligente para criar salas de agentes com IA que respondem perguntas baseadas em conteúdo de áudio transcrito.**

## 📋 Sobre o Projeto

O **Let me Ask** é uma aplicação full-stack que permite criar salas virtuais para **ensino e lives educativas**, onde usuários podem fazer perguntas e receber respostas inteligentes baseadas no conteúdo de áudio previamente enviado.

A IA analisa o conteúdo transcrito e gera respostas contextuais, agilizando o processo de responder perguntas que já foram abordadas durante a apresentação, aula ou live.

## ✨ Funcionalidades Principais

- 🎙️ **Upload de áudio** com transcrição automática
- 🏠 **Criação de salas** para organizar conteúdo
- ❓ **Sistema de perguntas** com respostas baseadas no contexto
- 🔍 **Busca semântica** usando embeddings vetoriais
- 💬 **Respostas inteligentes** geradas por IA

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js** com TypeScript
- **Fastify** como framework web
- **PostgreSQL** com pgvector para embeddings
- **Drizzle ORM** para banco de dados
- **Google Gemini AI** para IA
- **Docker** para containerização

### Frontend

- **React 19** com TypeScript
- **TanStack Router** para roteamento
- **ShadcnUI e Tailwind CSS** para estilização
- **React Hook Form** com Zod para validação
- **TanStack Query** para gerenciamento de estado

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- Chave da API do Google Gemini

### 1. Clone o repositório

```bash
git clone <repository-url>
cd nlw-agents
```

### 2. Configure o backend

```bash
cd server
npm install
cp .env.example .env
# Configure suas variáveis de ambiente
```

### 3. Configure o frontend

```bash
cd ../web
npm install
```

### 4. Execute o projeto

```bash
# Terminal 1 - Backend
cd server
docker-compose up -d
npm run db:migrate
npm run dev

# Terminal 2 - Frontend
cd web
npm run dev
```

## 🔧 Variáveis de Ambiente

### Backend (.env)

```env
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
GEMINI_API_KEY=sua_chave_api_aqui
```

## 📖 Documentação Detalhada

- **[Backend](./server/README.md)** - Documentação completa da API
- **[Frontend](./web/README.md)** - Documentação da aplicação web

## 🚀 Desenvolvido durante a

- **NLW (Next Level Week)** da Rocketseat
