// Função para mudar as telas
function mudarTela(telaAtiva) {
    const telas = document.querySelectorAll('.tela');
    telas.forEach(tela => {
      tela.classList.remove('active');
    });
  
    const telaSelecionada = document.getElementById(telaAtiva);
    if (telaSelecionada) {
      telaSelecionada.classList.add('active');
    }
  }
  
  // Adiciona a capacidade de arrastar os lixos
  const lixos = document.querySelectorAll('.lixo');
  const lixeiras = document.querySelectorAll('.lixeira');
  
  // Contador para verificar quantos lixos foram descartados
  let lixosDescartados = 0;
  const totalLixos = lixos.length; // Verifique se está correto (6 lixos no total)
  
  // Adiciona o evento de dragstart para cada lixo
  lixos.forEach(lixo => {
    lixo.setAttribute('draggable', 'true'); // Habilita o arrasto
    lixo.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text', event.target.dataset.tipo);  // Passa o tipo do lixo para o evento
    });
  });
  
  // Permite que as lixeiras aceitem o drop
  lixeiras.forEach(lixeira => {
    lixeira.addEventListener('dragover', (event) => {
      event.preventDefault(); // Necessário para permitir o drop
    });
  
    lixeira.addEventListener('drop', (event) => {
      event.preventDefault(); // Impede o comportamento padrão do drop
  
      const tipoLixo = event.dataTransfer.getData('text'); // Obtém o tipo de lixo arrastado
      const tipoLixeira = lixeira.getAttribute('data-tipo'); // Obtém o tipo da lixeira
  
      // Debugging para verificar se os valores estão sendo passados corretamente
      console.log(`Lixo: ${tipoLixo} | Lixeira: ${tipoLixeira}`);
  
      if (tipoLixo === tipoLixeira) {
        // Se o tipo de lixo for o mesmo da lixeira
        const lixo = document.querySelector(`.lixo[data-tipo="${tipoLixo}"]`);
        if (lixo) {
          lixo.style.display = 'none'; // Faz o lixo sumir
          lixosDescartados++; // Incrementa o contador de lixos descartados
          mostrarMensagem('sucesso', 'Lixo descartado corretamente!');
          verificarFimJogo(); // Verifica se o jogo foi completado
        }
      } else {
        // Se o lixo não for do tipo correto
        mostrarMensagem('erro', 'Descarte incorreto! Tente novamente.');
      }
    });
  });
  
  // Função para mostrar mensagem de sucesso ou erro
  function mostrarMensagem(tipo, texto) {
    const mensagem = document.getElementById('mensagem');
    if (mensagem) {
      mensagem.textContent = texto;
      mensagem.className = tipo === 'sucesso' ? 'sucesso' : 'erro';
      mensagem.style.display = 'block';
  
      // Esconde a mensagem após 2 segundos
      setTimeout(() => {
        mensagem.style.display = 'none';
      }, 2000);
    }
  }
  
  // Função para verificar se o jogo terminou
  function verificarFimJogo() {
    if (lixosDescartados === totalLixos) {
      // Se todos os lixos foram descartados, exibe a tela final
      setTimeout(() => {
        mudarTela('tela-final');
      }, 1500); // Espera 1.5 segundos para dar tempo de exibir a mensagem de sucesso
    }
  }
  
  // Função para iniciar o jogo
  document.addEventListener('DOMContentLoaded', () => {
    mudarTela('tela-inicial'); // Garantir que comece na tela inicial
  });
  