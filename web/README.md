# NLW Agents - Web

Aplicação web desenvolvida com React e TanStack Router para o projeto NLW Agents.

## 🚀 Tecnologias

### Core

- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server

### Roteamento

- **TanStack Router** - Roteamento type-safe com file-based routing
- **TanStack React Query** - Gerenciamento de estado e cache de dados

### Estilização

- **Tailwind CSS v4** - Framework CSS utility-first
- **Shadcn UI** - Componentes pré-estilizados
- **Class Variance Authority** - Sistema de variantes para componentes

### Desenvolvimento

- **Biome** - Linter e formatter (configurado com ultracite)
- **TanStack Router DevTools** - Ferramentas de desenvolvimento

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── ui/             # Componentes base (shadcn/ui)
├── lib/                # Utilitários e configurações
├── pages/              # Rotas da aplicação (file-based routing)
│   ├── __root.tsx      # Rota raiz
│   ├── index.tsx       # Página inicial
│   └── room/           # Rotas de sala
│       └── $id.tsx     # Rota dinâmica para sala específica
├── main.tsx            # Ponto de entrada da aplicação
└── route-tree.gen.ts   # Árvore de rotas gerada automaticamente
```

## ⚙️ Configurações

- **File-based routing** habilitado
- **Auto code splitting** ativo para otimização de performance
- **Route tree** gerada automaticamente via Vite plugin
- **Path mapping** configurado (`@/*` → `./src/*`)

## 🛠️ Setup e Instalação

### Pré-requisitos

- Node.js 18+
- npm, yarn, pnpm ou bun

### Instalação

1. **Clone o repositório**

```bash
git clone <repository-url>
cd web
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

3. **Execute o projeto em desenvolvimento**

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

## 🔧 Configurações Importantes

### Vite

O projeto utiliza o plugin do TanStack Router para Vite com:

- **Auto code splitting** habilitado
- **Route tree** gerada em `src/route-tree.gen.ts`
- **Alias** configurado para `@/*` apontando para `./src/*`

### TanStack Router

- **File-based routing** com diretório `src/pages/`
- **Route token**: `layout`
- **Code splitting automático** para otimização

### Tailwind CSS

- **Versão 4** com plugin Vite
- Configuração integrada com componentes UI

## 🚀 Deploy

O projeto está configurado para deploy em qualquer plataforma que suporte aplicações Vite/React:

```bash
npm run build
```

O build será gerado na pasta `dist/` e pode ser servido por qualquer servidor estático.

## 📚 Documentação Adicional

- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
