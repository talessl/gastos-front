# 💻 Gastos (Front-end / Interface)

## ⚠️ Branch
Troque para a branch `feature/front-sem-autenticacao`.

## 🚀 Opções para rodar

### 1. Docker Compose (Aconselhado)
É aconselhado o uso do `docker-compose` disponibilizado. 
**Obs:** Ele deve estar na raiz da pasta que contém tanto o `gastos-front` (interface) como o `gastos-back` (api).

Comando para executar a partir da pasta raiz:
```bash
docker-compose up -d --build
```
Após o container subir, acesse a interface no navegador pelo endereço: **http://localhost:8080**

### 2. Manualmente (VS Code Live Server)
Como o projeto é feito em JavaScript puro (Vanilla JS), você não precisa instalar dependências (npm/node) para rodar localmente.

1. Abra a pasta do front-end (`gastos-front`) no VS Code.
2. Instale a extensão **Live Server** (caso ainda não tenha).
3. Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"** (ou clique no botão "Go Live" no canto inferior direito do VS Code).
4. O navegador abrirá automaticamente a interface (geralmente na porta 5500).

## 📌 Observação sobre a API (Back-end)
Para que o painel funcione corretamente, salve transações e busque ações, **é obrigatório que o Back-end esteja rodando simultaneamente na porta 4000** (`http://localhost:4000/graphql`).
