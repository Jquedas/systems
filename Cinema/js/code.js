let cinemas = [];
let filmes = [];

let link = window.location.pathname;
console.log(link);

if (link == "/treino-main/src/tabelas.html") {
  // Verifica se o URL da página corresponde a tabelas.html
  if (sessionStorage.getItem("arrayCinema") != null) {
    // Verifica se existe um item chamado "arrayCinema" no sessionStorage
    let dadosCinemas = JSON.parse(sessionStorage.getItem("arrayCinema")); // Lê o valor "arrayCinema" do sessionStorage , que é uma string JSON, usa o JSON.parse() para converter essa string em um array de objetos literais

    dadosCinemas.forEach((cinema) => {
      let objCinema = Object.assign(new Cinema(), cinema);
      console.log(objCinema);
      cinemas.push(objCinema);
    });
  }
}

if (link == "/treino-main/src/tabelas.html") {
  if (sessionStorage.getItem("arrayFilme") != null) {
    let dadosFilme = JSON.parse(sessionStorage.getItem("arrayFilme"));

    dadosFilme.forEach((filme) => {
      let objFilme = Object.assign(new Filme(), filme);
      console.log(objFilme);
      filmes.push(objFilme);
    });
  }
}

if (link == "/treino-main/src/sessao.html") {
  if (sessionStorage.getItem("arrayCinema") != null) {
    let dadosCinemasSessao = JSON.parse(sessionStorage.getItem("arrayCinema"));

    dadosCinemasSessao.forEach((cinema) => {
      let objCinema = Object.assign(new Cinema(), cinema);
      console.log(objCinema);
      cinemas.push(objCinema);
    });
  }
}

if (link == "/treino-main/src/sessao.html") {
  if (sessionStorage.getItem("arrayFilme") != null) {
    let dadosFilmesSessao = JSON.parse(sessionStorage.getItem("arrayFilme"));

    dadosFilmesSessao.forEach((filme) => {
      let objFilme = Object.assign(new Filme(), filme);
      console.log(objFilme);
      filmes.push(objFilme);
    });
  }
}

function addCinema() {
  let localidade = $("#localidadeCinema").val();
  let morada = $("#moradaCinema").val();
  let nome = $("#nomeCinema").val();
  let codp = $("#codCinema").val();
  let ref = $("#refCinema").val();

  if (!localidade || !morada || !nome || !codp || !ref) {
    return alerta("Preencha os campos todos!", "Erro", "error");
  }

  if (validacod($("#refCinema").val(), cinemas)) {
    cinemas.push(new Cinema(localidade, morada, nome, codp, ref));

    let arrayCinemas = JSON.stringify(cinemas); // Converter o array cinemas(que contém objetos da class Cinema para uma string JSON)
    sessionStorage.setItem("arrayCinema", arrayCinemas); // Esta linha guarda a string JSON no sessionStorage, sob a chave "arrayCinema"

    alerta("Cinema adicionado com sucesso", "Sucesso", "success");
  } else {
    return alerta("Referência indicada já existe!", "Erro", "error");
  }
}

function addFilme() {
  let nome = $("#nomeFilme").val();
  let ano = $("#AnoFilme").val();
  let realizador = $("#realizadorFilme").val();
  let resumo = $("#descCinema").val();
  let codf = $("#codFilme").val();

  if (!nome || !codf || !ano || !realizador || !resumo) {
    return alerta("Preencha os campos todos", "Erro", "error");
  }

  if (validacod($("#codFilme").val(), filmes)) {
    filmes.push(new Filme(nome, codf, ano, realizador, resumo));
    console.log(filmes);

    let arrayFilmes = JSON.stringify(filmes);
    sessionStorage.setItem("arrayFilme", arrayFilmes);

    alerta("Filme adicionado!", "Sucesso", "success");
  } else {
    return alerta("Referência inserida já existe!", "Erro", "error");
  }
}

function addSessao() {
  cinema = $("#cinemaSelect").val();
  filme = $("#filmeSelect").val();

  cinemaIndex = parseInt(cinema);
  filmeIndex = parseInt(filme);

  cinemaSelecionado = cinemas[cinemaIndex];
  filmeSelecionado = filmes[filmeIndex];
  console.log(cinemaSelecionado, filmeSelecionado);

  if ($("#filmeSelect").val() == "-1" || $("#cinemaSelect").val() == "-1") {
    alerta("Selecione um filme e um cinema!", "Erro", "error");
    return;
  }

  cinemaSelecionado.sessoes.push({
    filme: filmeSelecionado.nome,
    data: $("#dataSessao").val(),
    hora: $("#horaSessao").val(),
  });

  let arrayCinemas = JSON.stringify(cinemas);
  sessionStorage.setItem("arrayCinema", arrayCinemas);

  alerta("Sessão adicionada com sucesso!", "Sucesso", "success");
  console.log(cinemas);
}

function feedtableCinema() {
  let msg = "";

  cinemas.forEach((cinema, index) => {
    msg += "<tr>";
    msg += "<td>" + (index + 1) + "</td>";
    msg += "<td>" + cinema.nome + "</td>";
    msg += "<td>" + cinema.morada + "</td>";
    msg += "<td>" + cinema.localidade + "</td>";
    msg +=
      "<td><input type='button' class='btn btn-primary' onclick='getInfoCinema(" +
      index +
      ")' value='Edit'></td>";
    msg += "</tr>";
  });

  $("#cinemasTabela tbody").html(msg);
}

function getInfoCinema(index) {
  $("#localidadeCinemaEdit").val(cinemas[index].localidade);
  $("#moradaCinemaEdit").val(cinemas[index].morada);
  $("#nomeCinemaEdit").val(cinemas[index].nome);
  $("#codCinemaEdit").val(cinemas[index].codp);
  $("#refCinema").val(cinemas[index].ref);

  $("#btnEdit").attr("onclick", "registaCinemaEdit(" + index + ")");
}

function registaCinemaEdit(index) {
  cinemas[index].localidade = $("#localidadeCinemaEdit").val();
  cinemas[index].morada = $("#moradaCinemaEdit").val();
  cinemas[index].nome = $("#nomeCinemaEdit").val();
  cinemas[index].codp = $("#codCinemaEdit").val();
  cinemas[index].ref = $("#refCinema").val();

  let arrayCinemas = JSON.stringify(cinemas);
  sessionStorage.setItem("arrayCinema", arrayCinemas);

  getCinema();
  feedtableCinema();

  alerta("Edição efetuada com sucesso!", "Sucesso!", "success");
}

function feedSessao(index) {
  let txt = "";

  if (index == -1) {
    $("#tabelaSessoes").html("");
    return;
  }

  var cinemaSelecionado = cinemas[index];
  console.log("O cinema selecionado foi", cinemaSelecionado);

  cinemaSelecionado.sessoes.forEach((sessao, i) => {
    txt += "<tr>";
    txt += "<td>" + (i + 1) + "</td>";
    txt += "<td>" + cinemaSelecionado.localidade + "</td>";
    txt += "<td>" + sessao.filme + "</td>";
    txt +=
      "<td><input type='button' class='btn btn-info' onclick='infoSessao(" +
      index +
      ")' value='Info'></td>";
    txt += "</tr>";
  });

  $("#tabelaSessoes").html(txt);
}

function infoSessao(index) {
  let cinema = cinemas[index];
  let txt = "";
  console.log(cinema);

  $("#infoSessaoModal").modal("show");
  $("#infoSessaoNome").html(cinema.nome);

  cinema.sessoes.forEach((elemento, index) => {
    txt += "<tr>";
    txt += "<th scope='row'>" + (index + 1) + "</th>";
    txt += "<td>" + elemento.hora + "</td>";
    txt += "<td>" + elemento.data + "</td>";
    txt += "<td>" + cinema.morada + "</td>";
    txt += "</tr>";
  });

  $("#listaSessoes").html(txt);
}

function validacod(val, arr) {
  let flag = true;

  arr.forEach((elemento) => {
    console.log("Comparar:", val, "com", elemento.ref);
    if (val == elemento.ref) {
      flag = false;
    }
  });
  return flag;
}

function getFilme() {
  filmes.length = 0; // Limpa o array antes de preencher

  let dados = JSON.parse(sessionStorage.getItem("arrayFilme"));
  console.log(dados);

  let txt = "<option value = '-1'>Escolha uma opção</option>";

  dados.forEach((filme, index) => {
    let objFilme = Object.assign(new Filme(), filme);
    console.log(objFilme);
    filmes.push(objFilme);

    txt += "<option value = " + index + ">" + objFilme.nome + "</option>";
  });
  $("#filmeSelect").html(txt);
}

function getCinema() {
  cinemas.length = 0; // Limpa o array antes de preencher

  let dados = JSON.parse(sessionStorage.getItem("arrayCinema"));
  console.log(dados);

  let txt = "<option value = '-1'>Escolha uma opção</option>";

  dados.forEach((cinema, index) => {
    let objCinema = Object.assign(new Cinema(), cinema);
    console.log(objCinema);
    cinemas.push(objCinema);

    txt += "<option value = '" + index + "'>" + objCinema.nome + "</option>";
  });
  $("#cinemaSelect").html(txt);
  $("#cinemaSelect2").html(txt);
  $("#cinemaSelectEdit").html(txt);
}

$(document).ready(function () {
  if (sessionStorage.getItem("arrayFilme") != null) {
    getFilme();
  }

  if (sessionStorage.getItem("arrayCinema") != null) {
    getCinema();
    feedtableCinema();
  }
  $("#cinemasTabela").DataTable();
});

function alerta(msg, titulo, icon) {
  Swal.fire({
    position: "center",
    icon: icon,
    title: titulo,
    text: msg,
    showConfirmButton: false,
    timer: 1500,
    showClass: {
      popup: `
              animate__animated
              animate__fadeInDown
              animate__faster
            `,
    },
    hideClass: {
      popup: `
              animate__animated
              animate__fadeOutUp
              animate__faster
            `,
    },
  });
}
