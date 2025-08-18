# NLW Agents Server

API REST para gerenciamento de salas de agentes desenvolvida com Fastify, TypeScript e PostgreSQL. A aplicação permite criar salas virtuais para **ensino e lives educativas**, onde usuários podem fazer perguntas e receber respostas inteligentes baseadas em conteúdo de áudio transcrito.

## 🛠️ Tecnologias

- **Runtime**: Node.js com TypeScript
- **Framework**: Fastify
- **Database**: PostgreSQL com pgvector para embeddings vetoriais
- **ORM**: Drizzle ORM
- **Validação**: Zod
- **IA**: Google Gemini AI para transcrição e geração de respostas
- **Linting/Formatting**: Biome + Ultracite
- **Containerização**: Docker Compose

## 🚀 Funcionalidades

- **Gerenciamento de Salas**: Criar e listar salas para organizar conteúdo
- **Upload de Áudio**: Enviar arquivos de áudio para transcrição
- **Transcrição Automática**: Converter áudio em texto usando Google Gemini AI
- **Geração de Embeddings**: Criar vetores semânticos para busca inteligente
- **Sistema de Perguntas**: Fazer perguntas e receber respostas baseadas no contexto
- **Busca Semântica**: Encontrar conteúdo relevante usando similaridade de embeddings
- **Respostas com IA**: Gerar respostas contextuais usando o conteúdo transcrito

## 📁 Estrutura do Projeto

```
src/
├── db/
│   ├── connection.ts      # Conexão com banco
│   ├── migrations/        # Migrações do Drizzle
│   ├── schemas/           # Schemas das tabelas
│   └── seed.ts           # Dados iniciais
├── http/
│   └── routes/           # Rotas da API
├── services/
│   └── gemini.ts         # Serviços de IA (transcrição, embeddings, respostas)
├── env.ts               # Validação de variáveis de ambiente
└── server.ts            # Servidor principal
```

## 🚀 Setup

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- Chave da API do Google Gemini

### Instalação

1. **Clone o repositório**

```bash
git clone <repository-url>
cd nlw-agents/server
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
# Configure PORT, DATABASE_URL e GEMINI_API_KEY
```

4. **Suba o banco de dados**

```bash
docker-compose up -d
```

5. **Execute as migrações**

```bash
npm run db:migrate
```

6. **Popule o banco (opcional)**

```bash
npm run db:seed
```

## 📡 API Endpoints

### Salas

- `GET /rooms` - Listar todas as salas
- `POST /rooms` - Criar nova sala

### Perguntas

- `GET /rooms/:roomId/questions` - Listar perguntas de uma sala
- `POST /rooms/:roomId/questions` - Criar nova pergunta

### Áudio

- `POST /rooms/:roomId/audio` - Upload de arquivo de áudio

### Sistema

- `GET /health` - Status do servidor

## 🔧 Configurações

### Variáveis de Ambiente

- `PORT` - Porta do servidor (padrão: 3333)
- `DATABASE_URL` - URL do PostgreSQL
- `GEMINI_API_KEY` - Chave da API do Google Gemini

## 🧠 Funcionamento da IA

### 1. Upload de Áudio

- Arquivo de áudio é recebido via multipart/form-data
- Convertido para base64 e enviado para Google Gemini AI
- Transcrição é gerada em português brasileiro

### 2. Geração de Embeddings

- Texto transcrito é convertido em vetores de 768 dimensões
- Embeddings são armazenados no PostgreSQL com pgvector
- Configurado para busca por similaridade (RETRIEVAL_DOCUMENT)

### 3. Sistema de Perguntas

- Pergunta do usuário é convertida em embeddings
- Busca semântica encontra chunks de áudio similares (similaridade > 0.7)
- Top 3 resultados mais relevantes são selecionados
- Contexto é enviado para Gemini AI gerar resposta

### 4. Geração de Respostas

- IA recebe pergunta + contexto dos chunks similares
- Resposta é gerada apenas com base no contexto fornecido
- Se não houver contexto suficiente, nenhuma resposta é gerada

## 📊 Schemas do Banco

### Rooms

- `id` (UUID) - Identificador único
- `name` (TEXT) - Nome da sala
- `description` (TEXT) - Descrição opcional
- `created_at` (TIMESTAMP) - Data de criação

### Questions

- `id` (UUID) - Identificador único
- `room_id` (UUID) - Referência à sala
- `question` (TEXT) - Pergunta do usuário
- `answer` (TEXT) - Resposta gerada pela IA
- `created_at` (TIMESTAMP) - Data de criação

### AudioChunks

- `id` (UUID) - Identificador único
- `room_id` (UUID) - Referência à sala
- `transcription` (TEXT) - Texto transcrito do áudio
- `embeddings` (VECTOR(768)) - Vetores semânticos
- `created_at` (TIMESTAMP) - Data de criação