# NLW Agents Server

API REST para gerenciamento de salas de agentes desenvolvida com Fastify, TypeScript e PostgreSQL.

## 🛠️ Tecnologias

- **Runtime**: Node.js com TypeScript
- **Framework**: Fastify
- **Database**: PostgreSQL com pgvector
- **ORM**: Drizzle ORM
- **Validação**: Zod
- **Linting/Formatting**: Biome + Ultracite
- **Containerização**: Docker Compose

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
├── env.ts               # Validação de variáveis de ambiente
└── server.ts            # Servidor principal
```

## 🚀 Setup

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose

### Instalação

1. **Clone o repositório**

```bash
git clone <repository-url>
cd nlw-agents-server
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
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

## 🏃‍♂️ Comandos

```bash
# Desenvolvimento
npm run dev

# Produção
npm start

# Banco de dados
npm run db:generate    # Gerar migrações
npm run db:migrate     # Executar migrações
npm run db:studio      # Abrir Drizzle Studio
npm run db:seed        # Popular banco
```

## 📡 API Endpoints

- `GET /health` - Status do servidor
- `GET /rooms` - Listar salas

## 🔧 Configurações

### Variáveis de Ambiente

- `PORT` - Porta do servidor (padrão: 3333)
- `DATABASE_URL` - URL do PostgreSQL

### Banco de Dados

- PostgreSQL 17 com pgvector
- Porta: 5432
- Database: `agents`
- Usuário: `docker`
- Senha: `docker`

## 🎯 Padrões de Projeto

- **Arquitetura**: API REST com Fastify
- **Validação**: Schema validation com Zod
- **Database**: Migrations com Drizzle ORM
- **Code Style**: Biome + Ultracite
- **Type Safety**: TypeScript strict mode
