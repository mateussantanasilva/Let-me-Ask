# NLW Agents Web

Interface web moderna para o NLW Agents, desenvolvida com React 19, TypeScript e TanStack Router. A aplicação permite criar salas virtuais para **ensino e lives educativas**, fazer upload de áudio e interagir com agentes de IA através de perguntas e respostas.

## 🛠️ Tecnologias

- **Framework**: React 19 com TypeScript
- **Roteamento**: TanStack Router para navegação type-safe
- **Estilização**: Tailwind CSS com componentes shadcn/ui
- **Formulários**: React Hook Form com validação Zod
- **Requisições**: TanStack Query para gerenciamento de dados
- **Linting**: Biome + Ultracite

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes base (shadcn/ui)
│   ├── create-room-form.tsx    # Formulário de criação de sala
│   ├── question-form.tsx       # Formulário de perguntas
│   ├── question-item.tsx       # Item individual de pergunta
│   ├── question-list.tsx       # Lista de perguntas
│   └── room-list.tsx           # Lista de salas
├── http/                # Camada de comunicação com API
│   ├── api.ts           # Configuração base da API
│   ├── types/           # Tipos TypeScript
│   └── use-*.ts         # Hooks customizados para API
├── lib/                 # Utilitários e configurações
├── pages/               # Páginas da aplicação
│   ├── __root.tsx       # Layout raiz
│   ├── _create-room/    # Página de criação de sala
│   └── room/$id/        # Páginas de sala específica
└── main.tsx             # Ponto de entrada da aplicação
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- Backend rodando (ver [README do servidor](../server/README.md))

### Instalação

1. **Instale as dependências**

```bash
npm install
```

2. **Configure as variáveis de ambiente**

```bash
# O frontend se conecta ao backend na porta 3333 por padrão
# Certifique-se de que o backend está rodando
```

3. **Execute em desenvolvimento**

```bash
npm run dev
```

4. **Build para produção**

```bash
npm run build
npm run preview
```

## 🎯 Rotas da Aplicação

### `/` - Página Inicial

- Formulário para criar nova sala
- Lista de todas as salas existentes
- Contador de perguntas por sala

### `/room/:id` - Sala Específica

- Visualização da sala selecionada
- Lista de perguntas e respostas
- Formulário para fazer novas perguntas
- Histórico de conversas

### `/room/:id/audio` - Upload de Áudio

- Interface para gravar áudio
- Upload de arquivos de áudio
- Transcrição automática via IA