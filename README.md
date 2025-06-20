
# Notification System

Sistema de notificação construído com TypeScript, aplicando a arquitetura limpa (Clean Architecture).  

Este projeto é uma API backend modular, desacoplada de frameworks específicos, usando Fastify para a camada HTTP, Prisma para acesso ao banco, e vários serviços para envio de notificações (email, WhatsApp, etc).

---

## 🧩 Tecnologias e Dependências

### Dependências principais
- [fastify](https://www.fastify.io/) — framework HTTP rápido e leve
- [prisma](https://www.prisma.io/) — ORM para banco de dados
- [@prisma/client](https://www.prisma.io/docs/reference/api-reference/prisma-client-js) — cliente Prisma gerado
- [dotenv](https://github.com/motdotla/dotenv) — gerenciamento de variáveis de ambiente
- [nodemailer](https://nodemailer.com/about/) — envio de emails
- [puppeteer](https://pptr.dev/) — automação e controle de navegador (ex: WhatsApp Web)
- [qrcode-terminal](https://github.com/gtanner/qrcode-terminal) — gerar QR codes no terminal
- [whatsapp-web.js](https://wwebjs.dev/) — integração com WhatsApp Web

### Dependências de desenvolvimento
- [typescript](https://www.typescriptlang.org/) — linguagem TypeScript
- [ts-node](https://typestrong.org/ts-node) e [tsx](https://github.com/esbuild-kit/tsx) — rodar TS diretamente
- [ts-node-dev](https://github.com/wclr/ts-node-dev) — reload automático para desenvolvimento
- Tipagens (`@types/node`, `@types/nodemailer`, etc) para melhor experiência e segurança

---

## 🏗 Estrutura do Projeto

```plaintext
src/
├── domain/                 # Entidades, Value Objects e interfaces de repositórios
├── application/            # Casos de uso (lógica de negócio orquestrada)
├── infrastructure/         # Implementações externas (banco, serviços, etc)
├── interfaces/             # Interfaces de entrada/saída (controllers, rotas HTTP)
└── main/                   # Startup da aplicação e injeção de dependências
```

---

## 🚀 Como rodar

### Pré-requisitos
- Node.js >= 16.x instalado
- Banco de dados configurado conforme `.env` e Prisma (ex: PostgreSQL)

### Passos

1. Clone o repositório:

```bash
git clone <[url-do-repositorio](https://github.com/Aversii/notification-system)>
cd notification-system
```

2. Instale as dependências:

```bash
npm install
```

3. Configure suas variáveis de ambiente (exemplo `.env`):

```
DATABASE_URL="sua-string-de-conexão"
EMAIL_USER="seu-email"
EMAIL_PASSWORD="sua-senha-ou-token"
```

4. Gere o cliente Prisma:

```bash
npx prisma generate --schema=src/infra/database/Prisma/schema.prisma
```

5. Execute a aplicação em modo desenvolvimento:

```bash
npm run dev
```

> O comando `dev` usa `tsx` para rodar o arquivo `index.ts` diretamente, com reload automático.

6. Para gerar a build:

```bash
npm run build
```

7. Para rodar a build compilada:

```bash
npm start
```

---

## 🗄️ Migrations (Banco de Dados)

Este projeto utiliza Prisma para gerenciar o schema do banco de dados.

### Criar uma migration (desenvolvimento)

Sempre que alterar o schema (`schema.prisma`), execute:

```bash
npx prisma migrate dev --name nome-da-sua-migration --schema=src/infra/database/Prisma/schema.prisma
```

Isso irá criar a migration, aplicar no banco local e atualizar o Prisma Client.

### Aplicar migrations em produção

Em produção ou no Docker:

```bash
npx prisma migrate deploy --schema=src/infra/database/Prisma/schema.prisma
```

Isso irá executar todas as migrations pendentes no banco configurado.

---

## 📦 Controllers principais

- **NotificationController** — gerenciamento das notificações (enviar, marcar falha, consultas)
- **ClientController** — criação, atualização e consulta de clientes
- **AgreementController** — criação e gerenciamento de acordos (agreements)

---

## 🤝 Estrutura dos casos de uso

- Casos de uso estão na camada `application/usecases/` e recebem as dependências de gateways/repositórios da camada `infrastructure/`.
- Exemplo: `SendNotification` utiliza `PrismaNotificationGateway`, `NodemailerEmailService` e `WhatsappService`.

---

## ⚙️ Observações técnicas

- Usamos `dotenv` para variáveis de ambiente
- Prisma para acesso ao banco, com repositórios implementados seguindo contratos do domínio
- Fastify para camada HTTP, garantindo performance e flexibilidade
- Serviços externos desacoplados em `infrastructure/service` (email, WhatsApp)
- Arquitetura limpa garante que domínio e lógica de negócio estejam isolados de frameworks e tecnologias externas

---

## Contato

Caso tenha dúvidas ou queira contribuir, fique à vontade para abrir issues ou pull requests!

---

Obrigado por usar o Notification System! 🚀
