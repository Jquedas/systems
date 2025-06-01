let clientes = [];
let flores = [];
let funcionarios = [];

let currentClienteIndex = null;
let currentEncomendaIndex = null;

link = window.location.pathname;
console.log(link);

$(document).ready(function () {

  TableEnc()
  TableCliente()
  

  if (link === "/flores.html") {
    getFlor(false); // não desabilita opções com stock 0
  } else {
    getFlor();
  }
  getCliente();
});

if (link == "/cliente.html") {
  if (sessionStorage.getItem("arrayClientes") != null) {
    let dados = JSON.parse(sessionStorage.getItem("arrayClientes"));

    dados.forEach((cliente) => {
      let objCliente = Object.assign(new Cliente(), cliente);
      console.log(objCliente);
      clientes.push(objCliente);
    });
  }
}

if (link == "/flores.html") {
  if (sessionStorage.getItem("arrayFlores") != null) {
    let dados = JSON.parse(sessionStorage.getItem("arrayFlores"));

    dados.forEach((flore) => {
      let objFlor = Object.assign(new Flor(), flore);
      console.log(objFlor);
      flores.push(objFlor);
    });
  }
}

if (link == "/funcionario.html") {
  if (sessionStorage.getItem("arrayFuncionarios") != null) {
    let dados = JSON.parse(sessionStorage.getItem("arrayFuncionarios"));

    dados.forEach((func) => {
      let objFunc = Object.assign(new Funcionario(), func);
      console.log(objFunc);
      funcionarios.push(objFunc);
    });
  }
}

if (link == "/encomendas.html") {
  if (sessionStorage.getItem("arrayClientes") != null) {
    let dados = JSON.parse(sessionStorage.getItem("arrayClientes"));

    dados.forEach((cliente) => {
      let objClienteEnc = Object.assign(new Cliente(), cliente);
      console.log(objClienteEnc);
      clientes.push(objClienteEnc);
    });
  }
}

if (link == "/encomendas.html") {
  if (sessionStorage.getItem("arrayFlores") != null) {
    let dados = JSON.parse(sessionStorage.getItem("arrayFlores"));

    dados.forEach((flor) => {
      let objFlor = Object.assign(new Flor(), flor);
      console.log(objFlor);
      flores.push(objFlor);
    });
  }
}

function gerarcod() {
  const numero = Math.floor(Math.random() * 9000) + 1000; // gera n 4 digitos --> Math.random - gera um n aleatorio Math.floor arredonda para baixo

  $("#nCliente").val(numero); // envia o valor para o input
}

function actualTime() {
  //const data = new Date();
  //const dia = data.getDay();
  //const mes = data.getMonth();
  //const ano = data.getFullYear();
  //dataAtual = `${dia}-${mes}-${ano}`;

  const data = new Date();
  const dia = String(data.getDate()).padStart(2, "0"); // dia do mês
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // mês + 1
  const ano = data.getFullYear();
  const dataAtual = `${dia}-${mes}-${ano}`;
  //console.log(dataAtual); // Exemplo: 29-05-2025

  const agora = new Date();
  const horas = agora.getHours();
  const minutos = agora.getMinutes();
  const segundos = agora.getSeconds();
  const actualhoras = `${horas}:${minutos}:${segundos}`;

  $("#horaSelect").val(dataAtual);
}

function addCliente() {
  if (validaTele($("#nifCliente").val(), clientes)) {
    clientes.push(
      new Cliente(
        $("#nomeCliente").val(),
        $("#moradaCliente").val(),
        $("#emailCliente").val(),
        $("#telefoneCliente").val(),
        $("#nascimentoCliente").val(),
        $("#nifCliente").val(),
        $("#empresaClienteSelect").val(),
        $("#nCliente").val()
      )
    );
    console.log(clientes);

    getCliente();

    let arrayObjs = JSON.stringify(clientes);
    sessionStorage.setItem("arrayClientes", arrayObjs);

    alerta("Cliente adicionado!", "Sucesso", "success");
  } else {
    alerta("Contribuinte indicado já existe!", "Erro", "error");
  }
}

function validaTele(val, arr) {
  let flag = true;

  arr.forEach((elemento, i) => {
    if (val == elemento.nif) {
      flag = false;
    }
  });
  return flag;
}

function addFlor() {
  const nome = $("#nomeFlor").val();
  const desc = $("#descFlores").val();
  const origem = $("#origemFlor").val();
  const ref = $("#refFlor").val();
  const especie = $("#espFlor").val();
  const quantidade = $("#qntFlor").val();

  if (validaRef(ref, flores)) {
    flores.push(new Flor(nome, desc, origem, ref, especie, quantidade));
    console.log(flores);

    getFlor();

    let arrayObjs = JSON.stringify(flores);
    sessionStorage.setItem("arrayFlores", arrayObjs);

    alerta("Flor adicionada!", "Sucesso", "success");
  } else {
    const florExistente = flores.find((f) => f.ref === ref);

    let msg = `A referência ${ref} já está associada á Flor ${florExistente.nome}.`;
    alertaflor(msg, "Referência duplicada", "error");
  }
}

function addFuncionario() {
  funcionarios.push(
    new Funcionario(
      $("#nomeFunc").val(),
      $("#moradaFunc").val(),
      $("#emailFunc").val(),
      $("#nFunc").val(),
      $("#dtContrato").val(),
      $("#nascimento").val(),
      $("#niffunc").val(),
      $("#nfornecedor").val()
    )
  );
  console.log(funcionarios);

  let arrayObjs = JSON.stringify(funcionarios);
  sessionStorage.setItem("arrayFuncionarios", arrayObjs);

  alerta("Funcionário adicionado!", "Sucesso", "success");
}

function addEncomenda() {
  estadoEnc = "Em processamento";

  cliente = $("#clienteSelect").val();
  if (cliente == "-1") {
    alerta("Escolha uma opção válida", "Erro", "error");
    return;
  }
  clienteSel = clientes[cliente];

  flor = $("#florSelect").val();
  if (flor == "-1") {
    alerta("Escolha uma flor válida", "Erro", "error");
    return;
  }
  florSel = flores[flor];

  let arranjo = $("#arranjoFlor").val();
  let ref = $("#refFlor").val();
  let descricao = $("#descFlores").val();
  let qnt = parseInt($("#qntFlor").val());
  let hora = $("#horaSelect").val();

  if (qnt > florSel.qnt) {
    alerta("#Quantidade solicitada excede o stock disponível", "Erro", "error");
    return;
  }

  flores[flor].qnt = florSel.qnt - qnt;

  //console.log("foi esta",florSel);

  clienteSel.encomenda.push({
    flor: florSel,
    arranjo: arranjo,
    ref: ref,
    descricao: descricao,
    qnt: qnt,
    hora: hora,
    estado: estadoEnc,
  });

  console.log(clientes);

  let arrayObj = JSON.stringify(clientes);
  sessionStorage.setItem("arrayClientes", arrayObj);

  let arrayFlore = JSON.stringify(flores);
  sessionStorage.setItem("arrayFlores", arrayFlore);

  alerta("Encomenda adicionada !", "Sucesso", "success");
  TableEnc();
}

function getCliente() {
  let txt = "<option value='-1'>Escolha uma opção</option>";

  if (clientes.length === 0) {
    let dados = JSON.parse(sessionStorage.getItem("arrayClientes"));

    dados.forEach((cliente) => {
      let objCliente = Object.assign(new Cliente(), cliente);
      clientes.push(objCliente);
    });
  }

  // Preencher o select com os clientes carregados
  clientes.forEach((cliente, index) => {
    txt += "<option value='" + index + "'>" + cliente.nome + "</option>";
  });

  $("#clienteSelect").html(txt);
}

function getFlor(offDisabled = true) {
  let txt = "<option value = '-1'>Escolha uma opção</option>";

  if (flores.length === 0) {
    let dados = JSON.parse(sessionStorage.getItem("arrayFlores"));

    dados.forEach((flore) => {
      objFlore = Object.assign(new Flor(), flore);
      flores.push(objFlore);
    });
  }

  flores.forEach((flor, index) => {
    if (offDisabled && flor.qnt == 0) {
      txt += `<option value='${index}' disabled style="color: red;">${flor.nome} (Sem stock)</option>`;
    } else {
      txt += "<option value = '" + index + "'>" + flor.nome + "</option>";
    }
  });

  $("#florSelect").html(txt);
  $("#florSelect2").html(txt);
}

function validaRef(val, arr) {
  let flag = true;

  arr.forEach((elemento) => {
    if (val == elemento.ref) flag = false;
  });
  return flag;
}

function addStock() {
  let flor = $("#florSelect2").val();

  let florSele = flores[flor];

  let qnt = parseInt($("#qntStock").val());

  if (flor == "-1" || isNaN(flor)) {
    alert("Por favor selecione uma flor válida.");
    return;
  }

  if (florSele.qnt == 0) {
    florSele.adicionarStock(qnt);

    let objFlorre = JSON.stringify(flores);
    sessionStorage.setItem("arrayFlores", objFlorre);
  } else {
    alerta(`Flor ${florSele.nome} ainda tem em stock ${florSele.qnt}`);
    return;
  }
}

function TableEnc(){

   if ( $.fn.DataTable.isDataTable('#tableFlores') ) {
    $('#tableFlores').DataTable().destroy();
  }
  
  txt = "";

 clientes.forEach((cliente, indexCliente) => {
    cliente.encomenda.forEach((enc, indexEncomenda) => {
      txt += "<tr>";
      txt += "<th scope='row'>" + (indexCliente + 1) + "</th>";
      txt += "<td>" + enc.ref + "</td>";
      txt += "<td>" + cliente.nome + "</td>";
      txt += "<td>" + enc.estado + "</td>";
      txt += `<td><button class='btn btn-info' onclick='info(${indexCliente}, ${indexEncomenda})'>Info</button></td>`;
    });
  });

$('#tableFlores tbody').html(txt);
$('#tableFlores').DataTable();
}

function TableCliente(){

   if ( $.fn.DataTable.isDataTable('#tableCliente') ) {
    $('#tableCliente').DataTable().destroy();
  }
  
  txt = "";

 clientes.forEach((cliente,index)=>{
  txt +="<tr>";
  txt += "<th scope = 'row'>"+(index+1)+"</th>";
  txt += "<td>"+cliente.nome+"</td>";
  txt += "<td>"+cliente.nif+"</td>";
  txt += "<td><button class = 'btn btn-info' onclick = 'infoCliente("+index+")'>Info</button></td>";
  txt+="</tr>";
 });

$('#tableCliente tbody').html(txt);
$('#tableCliente').DataTable();
}

function infoCliente(index){

  let cliente = clientes[index];

  $('#indexClienteEdit').val(index); // id hidden que permite receber um arg

  $('#editarClienteModal').modal('show');

  $('#numCliente').val(cliente.ncliente);
  $('#nomeClienteEdit').val(cliente.nome);
  $('#moradaClienteEdit').val(cliente.morada);
  $('#emailClienteEdit').val(cliente.email);
  $('#telefoneClienteEdit').val(cliente.telefone);
  $('#nascimentoClienteEdit').val(cliente.nascimento);
  $('#nifClienteEdit').val(cliente.nif);
  $('#empresaClienteEdit').val(cliente.tipoEmp);

}

function salvaEdicao(){

  let index = parseInt($('#indexClienteEdit').val());

  clientes[index].nome = $('#nomeClienteEdit').val();
  clientes[index].morada = $('#moradaClienteEdit').val();
  clientes[index].email = $('#emailClienteEdit').val();
  clientes[index].telefone = $('#telefoneClienteEdit').val();
  clientes[index].nascimento = $('#nascimentoClienteEdit').val();
  clientes[index].nif = $('#nifClienteEdit').val();
  clientes[index].empresa = $('#empresaClienteEdit').val();

  sessionStorage.setItem("arrayClientes", JSON.stringify(clientes));


getCliente();
TableCliente();
$('#editarClienteModal').modal('hide');
}

function info(indexCliente,indexEncomenda){

  let cliente = clientes[indexCliente];
  //let enc = cliente.encomenda[indexEncomenda];

  $('#infoModal').modal('show');
  $('#infoEncomendaNome').html(cliente.nome);

  let txt = "";

  cliente.encomenda.forEach((enc,index)=>{
    console.log("Encomenda:", enc);
    txt += "<tr>";
    txt += "<th scope='row'>" + (index + 1) + "</th>";
    txt += "<td>" + enc.flor._nome+ "</td>";
    txt += "<td>" + enc.arranjo+ "</td>";
    txt += "<td>" + enc.descricao+ "</td>";
     txt += `<td><button class="btn btn-sm btn-warning" onclick="alterarEstado(${indexCliente}, ${index})">Alterar Estado</button></td>`;
    txt += "</tr>";
  });

currentClienteIndex = indexCliente;
currentEncomendaIndex = indexEncomenda;

$('#infoEncomendaBody').html(txt);
}

function alterarEstado() {
  if (currentClienteIndex === null || currentEncomendaIndex === null) {
    alerta("Nenhuma encomenda selecionada.", "Erro", "error");
    return;
  }

  clientes[currentClienteIndex].encomenda[currentEncomendaIndex].estado = "Em desenvolvimento";

  // Atualiza sessionStorage para persistir o estado
  sessionStorage.setItem("arrayClientes", JSON.stringify(clientes));

  alerta("Estado alterado para 'Em desenvolvimento' com sucesso.", "Sucesso", "success");

  $('#infoModal').modal('hide');

  TableEnc(); // Atualiza tabela na página para refletir mudança
}


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

function alertaflor(msg, titulo, icon) {
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
