let dados = [
  {
    data: '07/05/2025',
    planejamento: '3000 - Aula LinkedIn para estudantes',
    observacoes: 'Informação e Comunicação\nProgramação Mobile'
  },
  {
    data: '07/05/2025 (2ª)',
    planejamento: '1002 - Configurando a Web API',
    observacoes: 'Organizar materiais, ferramentas e local de trabalho.'
  }
];

let itemEditando = null;

function carregarTabela() {
  const tabela = document.getElementById('tabela-conteudo');
  tabela.innerHTML = '';
  dados.forEach((item, index) => {
    tabela.innerHTML += `
      <tr>
        <td>${item.data}</td>
        <td>${item.planejamento}</td>
        <td>${item.observacoes.replace(/\n/g, "<br>")}</td>
        <td class="actions">
          <button onclick="editarItem(${index})">✏️</button>
          <button onclick="deletarItem(${index})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

function editarItem(index) {
  itemEditando = index;
  const item = dados[index];
  document.getElementById('data').value = item.data;
  document.getElementById('planejamento').value = item.planejamento.startsWith("3000") ? "3000" : "1002";
  document.getElementById('observacoes').value = item.observacoes;
  document.getElementById('formularioEdicao').classList.remove('hidden');
}

function deletarItem(index) {
  if (confirm("Deseja realmente deletar este item?")) {
    dados.splice(index, 1);
    carregarTabela();
  }
}

function salvar() {
  const data = document.getElementById('data').value;
  const plano = document.getElementById('planejamento').value;
  const obs = document.getElementById('observacoes').value;

  if (itemEditando === null) {
    // Adicionar novo item
    dados.push({
      data: data,
      planejamento: plano === "3000" ? "3000 - Aula LinkedIn para estudantes" : "1002 - Configurando a Web API",
      observacoes: obs
    });
  } else {
    // Editar item existente
    dados[itemEditando] = {
      data: data,
      planejamento: plano === "3000" ? "3000 - Aula LinkedIn para estudantes" : "1002 - Configurando a Web API",
      observacoes: obs
    };
  }

  document.getElementById('formularioEdicao').classList.add('hidden');
  carregarTabela();
}

function cancelar() {
  document.getElementById('formularioEdicao').classList.add('hidden');
}

// Botão Home - abre a página da logo numa nova aba
document.getElementById('btn-home').addEventListener('click', () => {
  window.open('home.html', '_blank');
});

// Botão Salvar (novo registro) - abre modal para novo conteúdo
document.getElementById('btn-save').addEventListener('click', () => {
  itemEditando = null; // Indica que é novo registro
  document.getElementById('data').value = '';
  document.getElementById('planejamento').value = '3000';
  document.getElementById('observacoes').value = '';
  document.getElementById('formularioEdicao').classList.remove('hidden');
});

carregarTabela();
