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


