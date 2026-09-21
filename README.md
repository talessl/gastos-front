# 💻 Controle de Gastos Mensais (Front-end / Interface)

Descrição: O projeto foi desenvolvido com o intuito de facilitar o controle financeiro por meio de uma interface de calendário, oferecendo uma interatividade prática para adição e gerenciamento de lucros e gastos durante o mês. Além disso, há a utilização de APIs externas (Brapi e YahooFinance) para a checagem de oportunidades no mercado da B3, seguindo uma estratégia de ações em estado de sobrevenda (Índices: RSI abaixo de 30 e Estocástico abaixo de 20). A plataforma também permite a consulta rápida de ações do mercado.

## 🚀 Opções para rodar

### 1. Docker Compose (Aconselhado)
É aconselhado o uso do `docker-compose` disponibilizado. 
**Obs:** Ele deve estar na raiz da pasta que contém tanto o `gastos-front` (interface) como o `gastos-back` (api).

Comando para executar a partir da pasta raiz:
```bash
docker-compose up -d --build
```
Após o container subir, acesse a interface no navegador pelo endereço: **http://localhost:8080**

### 2. Manualmente a partir de VS Code Live Server
Como o projeto é feito em JavaScript puro (Vanilla JS), você não precisa instalar dependências (npm/node) para rodar localmente.

1. Abra a pasta do front-end (`gastos-front`) no VS Code.
2. Instale a extensão **Live Server** (caso ainda não tenha).
3. Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"** (ou clique no botão "Go Live" no canto inferior direito do VS Code).
4. O navegador abrirá automaticamente a interface.

## 📄 Licença e Uso
Este projeto foi desenvolvido estritamente para fins **pessoais e educacionais**. Não há intenção ou permissão para uso comercial, respeitando assim as políticas e diretrizes das APIs de terceiros integradas ao sistema (Yahoo Finance e Brapi).

## 🔐 Cadastro
O sistema é aberto e focado na praticidade local. Não é necessário nenhum tipo de cadastro, criação de conta ou login para utilizar o painel de controle e buscar as ações.

## 🛣️ Rotas Utilizadas

Por utilizar a arquitetura GraphQL, o sistema não possui múltiplas rotas (como as tradicionais APIs REST). Toda a comunicação do projeto é centralizada:

* **Front-end (Interface):** Aplicação de página única (SPA). Toda a navegação ocorre diretamente no `index.html`.
* **Back-end (Comunicação):** Utiliza um único endpoint para requisições:
  * `POST /graphql`: Responsável por absolutamente todas as operações do sistema (criar, listar, editar e excluir transações financeiras, além das consultas de ativos na B3).

### Externas (Mercado Financeiro):

* Brapi: Consulta direta à rota [https://brapi.dev/api/quote/list](https://brapi.dev/api/quote/list) para listar e filtrar os ativos da B3.

* Yahoo Finance: Consumido através da biblioteca Python yfinance, sem a necessidade de expor ou mapear rotas HTTP manualmente no código.

