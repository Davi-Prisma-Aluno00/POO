let times = [];


document.querySelector("button").addEventListener("click", cadastrarTime);

function cadastrarTime() {
  const nomeInput = document.getElementById("nomeTime");
  const nome = nomeInput.value.trim();

  if (!nome) {
    alert("Digite o nome do time!");
    return;
  }

  if (times.some(t => t.nome === nome)) {
    alert("Time já cadastrado!");
    return;
  }

  times.push({
    nome: nome,
    pontos: 0,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    saldo: 0
  });

  nomeInput.value = "";
  atualizarSeletores();
  atualizarTabela();
}

function atualizarSeletores() {
  const select1 = document.getElementById("time1");
  const select2 = document.getElementById("time2");

  select1.innerHTML = '<option value="">Selecione</option>';
  select2.innerHTML = '<option value="">Selecione</option>';

  times.forEach(time => {
    const option1 = new Option(time.nome, time.nome);
    const option2 = new Option(time.nome, time.nome);
    select1.add(option1);
    select2.add(option2);
  });
}

document.querySelectorAll("button")[1].addEventListener("click", registrarPartida);

function registrarPartida() {
  const t1 = document.getElementById("time1").value;
  const t2 = document.getElementById("time2").value;
  const g1 = parseInt(document.getElementById("gols1").value);
  const g2 = parseInt(document.getElementById("gols2").value);

  if (!t1 || !t2 || isNaN(g1) || isNaN(g2)) {
    alert("Preencha todos os campos!");
    return;
  }

  if (t1 === t2) {
    alert("Os times devem ser diferentes!");
    return;
  }

  const time1 = times.find(t => t.nome === t1);
  const time2 = times.find(t => t.nome === t2);

  time1.saldo += (g1 - g2);
  time2.saldo += (g2 - g1);

  if (g1 > g2) {
    time1.pontos += 3;
    time1.vitorias++;
    time2.derrotas++;
  } else if (g2 > g1) {
    time2.pontos += 3;
    time2.vitorias++;
    time1.derrotas++;
  } else {
    time1.pontos++;
    time2.pontos++;
    time1.empates++;
    time2.empates++;
  }

  atualizarTabela();
}

function atualizarTabela() {
  times.sort((a, b) =>
    b.pontos - a.pontos || b.saldo - a.saldo
  );

  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  times.forEach((time, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${time.nome}</td>
        <td>${time.pontos}</td>
        <td>${time.vitorias}</td>
        <td>${time.empates}</td>
        <td>${time.derrotas}</td>
        <td>${time.saldo}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}


