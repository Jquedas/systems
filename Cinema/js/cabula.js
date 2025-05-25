let clientes = [];
let funcionarios = [];
let marcacoes = [];



let link = window.location.pathname;
console.log(link)

if (link == "/manha021/5415/ficha2/clientes.html") {
  if (sessionStorage.getItem('arrayClientes') != null) {

    let dados = JSON.parse(sessionStorage.getItem("arrayClientes"));

    dados.forEach((cliente) => {

      let objCliente = Object.assign(new Cliente, cliente)
      console.log(objCliente.pNome)
      clientes.push(objCliente)

    });
    console.log(clientes)
  }
}

if (link == "/manha021/5415/ficha2/funcionarios.html") {
  if (sessionStorage.getItem('arrayFuncionarios') != null) {
    let dados = JSON.parse(sessionStorage.getItem("arrayFuncionarios"));

    dados.forEach((funcionario) => {

      let objFuncionario = Object.assign(new Funcionario, funcionario)
      funcionarios.push(objFuncionario)
    });

    console.log(funcionarios)
  }
}


if (link == "/manha021/5415/ficha2/marcacoes.html") {
  if (sessionStorage.getItem('arrayMarcacoes') != null) {
    let dados = JSON.parse(sessionStorage.getItem("arrayMarcacoes"));

    dados.forEach((marcacao) => {

      let objMarcacao = Object.assign(new Marcacao, marcacao)
      marcacoes.push(objMarcacao)
    });

    console.log(marcacoes)
  }
}

function registaCliente() {

  clientes.push(new Cliente(
    $('#pNomeCliente').val(),
    $('#uNomeCliente').val(),
    $('#telCliente').val(),
    $('#emailCliente').val(),
    $('#moradaCliente').val(),
    $('#nifCliente').val(),
    $('#matriculaCliente').val()
  ));

  console.log(clientes);

  let arrayObjs = JSON.stringify(clientes);
  sessionStorage.setItem("arrayClientes", arrayObjs);

  alerta("Cliente Registado com Sucesso!", "success");
}

function registaFuncionario() {

  funcionarios.push(new Funcionario(
    $('#pNomeCliente').val(),
    $('#uNomeCliente').val(),
    $('#telCliente').val(),
    $('#emailCliente').val(),
    $('#moradaCliente').val(),
    $('#nifCliente').val(),
    $('#nFuncionario').val(),
    $('#idade').val(),
    $('#tipo').val()
  ));

  console.log(funcionarios);

  let arrayObjs = JSON.stringify(funcionarios);
  sessionStorage.setItem("arrayFuncionarios", arrayObjs);

  alerta("Funcionário Registado com Sucesso!", "success");
}

function registaMarcacao() {

  marcacoes.push(new Marcacao(
    $('#data').val(),
    $('#servico').val(),
    $('#cliente').val(),
    $('#funcionario').val()
  ));

  console.log(marcacoes);

  let arrayObjs = JSON.stringify(marcacoes);
  sessionStorage.setItem("arrayMarcacoes", arrayObjs);

  getMarcacoesAgendadas();

  alerta("Marcação registada", "success");
}

function getCliente() {

  let dados = JSON.parse(sessionStorage.getItem("arrayClientes"));
  console.log(dados);

  let msg = "<option value='-1'>Escolha uma opção</option>";

  dados.forEach((cliente, index) => {

    let objCliente = Object.assign(new Cliente, cliente)
    console.log(objCliente)
    clientes.push(objCliente)

    //msg += objCliente.option()

    msg += "<option value='" + index + "'>" + objCliente.pNome + "</option>";
  })

  $('#cliente').html(msg);

}


function getFuncionario() {

  let dados = JSON.parse(sessionStorage.getItem("arrayFuncionarios"));
  console.log(dados);

  let msg = "<option value='-1'>Escolha uma opção</option>";

  dados.forEach((func, index) => {

    let objFuncionario = Object.assign(new Funcionario, func)
    console.log(objFuncionario)
    funcionarios.push(objFuncionario)

    //msg += objCliente.option()

    msg += "<option value='" + index + "'>" + objFuncionario.pNome + "</option>";
  })

  $('#funcionario').html(msg);

}

function getMarcacoesAgendadas() {
  let msg = "";

  marcacoes.forEach((marcacao, index) => {

    if (marcacao.estado == "Agendado") {
      msg += "<tr>";
      msg += "<th scope='row'>" + (index + 1) + "</th>";
      msg += "<td>" + marcacao.data + "</td>";
      msg += "<td>" + marcacao.servico + "</td>";
      msg += "<td>" + clientes[marcacao.cliente].pNome + " " + clientes[marcacao.cliente].uNome + "</td>";
      msg += "<td>" + funcionarios[marcacao.funcionario].pNome + " " + funcionarios[marcacao.funcionario].uNome + "</td>";
      msg += "<td>" + marcacao.estado + "</td>";
      msg += "<td><button type='button' class='btn btn-danger' onclick='setEstado(" + index + ", 1)'>Cancelar</button><button type='button' class='btn btn-success' onclick='setEstado(" + index + ", 2)'>Finalizar</button></td>";
      msg += "</tr>";
    }
  })

  $('#listagemAgendadas').html(msg);

}


function getMarcacoesFinalizadas() {
  let msg = "";

  marcacoes.forEach((marcacao, index) => {

    if (marcacao.estado == "Finalizado") {
      msg += "<tr>";
      msg += "<th scope='row'>" + (index + 1) + "</th>";
      msg += "<td>" + marcacao.data + "</td>";
      msg += "<td>" + marcacao.servico + "</td>";
      msg += "<td>" + clientes[marcacao.cliente].pNome + " " + clientes[marcacao.cliente].uNome + "</td>";
      msg += "<td>" + funcionarios[marcacao.funcionario].pNome + " " + funcionarios[marcacao.funcionario].uNome + "</td>";
      msg += "<td>" + marcacao.estado + "</td>";
      msg += "</tr>";
    }
  })

  $('#listagemEfetuadas').html(msg);

}

function setEstado(index, opcao) {

  if (opcao == 1) {
    marcacoes[index].estado = "Cancelado"
  } else if (opcao == 2) {
    marcacoes[index].estado = "Finalizado"
  }

  alerta("Estado Alterado", "success")

  let arrayObjs = JSON.stringify(marcacoes);
  sessionStorage.setItem("arrayMarcacoes", arrayObjs);

  console.log(marcacoes)

  getMarcacoesAgendadas();
  getMarcacoesFinalizadas();

}

function alerta(msg, icon) {

  Swal.fire({
    position: 'center',
    icon: icon,
    title: msg,
    showConfirmButton: false,
    timer: 1500
  })
}

$(document).ready(function () {

  if (link == "/manha021/5415/ficha2/marcacoes.html") {

    if (sessionStorage.getItem('arrayClientes') != null) {
      getCliente();
    }

    if (sessionStorage.getItem('arrayFuncionarios') != null) {
      getFuncionario();
    }

    getMarcacoesAgendadas();
    getMarcacoesFinalizadas();

  }

});