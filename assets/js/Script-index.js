// Script-index.js

document.querySelectorAll('.personagem').forEach(botao => {
    botao.addEventListener('click', function () {
      // Remove seleção anterior
      document.querySelectorAll('.personagem').forEach(p => p.classList.remove('selecionado'));
  
      // Adiciona classe de selecionado
      this.classList.add('selecionado');
  
      // Salva personagem
      const personagem = this.textContent.trim();
      localStorage.setItem('personagemSelecionado', personagem);
  
      // Atualiza o botão de batalha
      const botaoBatalha = document.querySelector('.botao-batalha');
      botaoBatalha.classList.remove('disabled');
      botaoBatalha.href = `telaBatalha.html?personagem=${encodeURIComponent(personagem)}`;
    });
  });
  
  // Verifica se tentar clicar sem selecionar
  document.querySelector('.botao-batalha').addEventListener('click', (e) => {
    if (!localStorage.getItem('personagemSelecionado')) {
      e.preventDefault();
      alert('Por favor, selecione um personagem antes de começar a batalha!');
    }
  });
  