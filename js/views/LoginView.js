// arquivo: js/views/LoginView.js

export class LoginView {
  constructor() {
    this.authContainer = document.getElementById("auth-container");
    this.appContainer = document.getElementById("app-container");
  }

  // 1. Desenha o formulário na tela
  renderizar() {
    this.authContainer.innerHTML = `
      <div class="painel-login" style="max-width: 400px; margin: 80px auto; padding: 32px; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); font-family: sans-serif;">
        <h2 style="text-align: center; color: #1e293b; margin-bottom: 24px;">Acesso ao Sistema</h2>
        
        <div id="msg-erro" style="color: #dc2626; background: #fee2e2; padding: 10px; border-radius: 6px; margin-bottom: 15px; text-align: center; display: none; font-size: 14px;"></div>
        
        <input type="email" id="input-email" placeholder="Seu e-mail" style="width: 100%; box-sizing: border-box; padding: 12px; margin-bottom: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 16px;">
        <input type="password" id="input-senha" placeholder="Sua senha" style="width: 100%; box-sizing: border-box; padding: 12px; margin-bottom: 24px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 16px;">
        
        <button id="btn-login" style="width: 100%; padding: 12px; background: #2563eb; color: #fff; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; margin-bottom: 12px; transition: background 0.2s;">Entrar</button>
        <button id="btn-registrar" style="width: 100%; padding: 12px; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; transition: background 0.2s;">Criar Nova Conta</button>
      </div>
    `;
  }

  // 2. Pega os dados que o usuário digitou
  obterDadosFormulario() {
    return {
      email: document.getElementById("input-email").value,
      senha: document.getElementById("input-senha").value,
    };
  }

  // 3. Mostra alertas de erro (ex: Senha incorreta)
  mostrarErro(mensagem) {
    const divErro = document.getElementById("msg-erro");
    divErro.textContent = mensagem;
    divErro.style.display = "block";
  }

  esconderErro() {
    document.getElementById("msg-erro").style.display = "none";
  }

  // 4. Alterna a visibilidade das telas
  mostrarTelaLogin() {
    this.authContainer.style.display = "block";
    this.appContainer.style.display = "none"; // Esconde o app de finanças
  }

  mostrarTelaApp() {
    this.authContainer.style.display = "none"; // Esconde o login
    this.appContainer.style.display = "block"; // Mostra o app de finanças
  }
}
