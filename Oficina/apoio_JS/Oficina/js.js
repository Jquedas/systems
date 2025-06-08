let clientes = [];
let veiculos = [];
let funcionarios = [];


$(document).ready(function(){
  getCliente();
  getVeiculos();
  getFuncionarios();


});

link = window.location.pathname;
console.log(link);

if(link === "/tabelas.html"){
  if(sessionStorage.getItem('arrayVeiculos')!=null){

    let dados = JSON.parse(sessionStorage.getItem('arrayVeiculos'));

    dados.forEach((veiculo)=>{
      let objVeiculo = Object.assign(new Veiculo, veiculo);
      console.log(objVeiculo);
      veiculos.push(objVeiculo)
    });
  }
}

if(link==="/funcionario.html"){
  if(sessionStorage.getItem('arrayFuncionarios')!=null){

    let dados = JSON.parse(sessionStorage.getItem('arrayFuncionarios'));

    dados.forEach((funcionario)=>{
      let objFunc = Object.assign(new Funcionario,funcionario)
      console.log(objFunc);
      funcionarios.push(objFunc);
    });
  }
}

if(link === "/veiculo.html"){
  if(sessionStorage.getItem('arrayVeiculos')!=null){

    let dados = JSON.parse(sessionStorage.getItem('arrayVeiculos'));

    dados.forEach((veiculo)=>{
      let arrVeiculo = Object.assign(new Veiculo, veiculo)
      console.log(arrVeiculo);
      veiculos.push(arrVeiculo);
    });
  }
}

if(link === "/veiculo.html"){
  if(sessionStorage.getItem('arrayClientes')!=null){
    
    let dados = JSON.parse(sessionStorage.getItem('arrayClientes'));

    dados.forEach((clienteEncriptado)=>{
      let objCliente = Cliente.desencriptar(clienteEncriptado);

      clientes.push(objCliente);
    });
    console.log(clientes);
  }
}

if(link === "/cliente.html"){
  if(sessionStorage.getItem('arrayClientes')!=null){
    
    let dados = JSON.parse(sessionStorage.getItem('arrayClientes'));

    dados.forEach((clienteEncriptado)=>{
      // Usar o método estático para desencriptar e instanciar
      let objCliente = Cliente.desencriptar(clienteEncriptado);

      clientes.push(objCliente);
    });
    console.log(clientes);
  }
}


function addCliente() {

  const nome = $('#nomeCliente').val();
  const morada = $('#moradaCliente').val();
  const nif = $('#nifCliente').val();
  const telemovel = $('#telefoneCliente').val();
  const email = $('#emailCliente').val();
  const tipoEmpresa = $('#tipoEmpresa').val();

  if (!validaNIF(nif,clientes)) {
    alerta("NIF indicado já existe!", "Erro", "error");
    return
  }

  // Criar a instância de Cliente
  let newCliente = new Cliente(nome,morada,nif,telemovel,email,tipoEmpresa);

  // Encriptar o cliente usando o método estático da classe Cliente
  const dadosEncriptados = Cliente.encriptar(newCliente);
  console.log("Dados Encriptados:",dadosEncriptados);

  // Recuperar o array já salvo ou criar um novo vazio
  let clientesEncriptados = [];
  if(sessionStorage.getItem('arrayClientes')){
    clientesEncriptados = JSON.parse(sessionStorage.getItem('arrayClientes'));
  }

  // Adicionar novo cliente encriptado
  clientesEncriptados.push(dadosEncriptados);

   // Salvar novamente no sessionStorage
   sessionStorage.setItem('arrayClientes',JSON.stringify(clientesEncriptados));

   // Atualizar o array local também
   clientes.push(newCliente); 

 alerta("Cliente adicionado!","Sucesso!","success");
}

function addVeiculo(){
  const clienteIndex = parseInt($('#clienteSelect').val());

  if (isNaN(clienteIndex) || clienteIndex < 0 || clienteIndex >= clientes.length) {
    alerta("Cliente inválido!", "Erro", "error");
    return;
  }

  const clienteObj = clientes[clienteIndex];
  const matricula = $('#matriculaCarro').val();
  const marca = $('#marcaCarro').val();
  const modelo = $('#modeloCarro').val();
  const tipo = $('#selectCarrotipo').val();

  if(!validaCarro(matricula, veiculos)){
    alerta("Matrícula já existe!", "Erro", "error");
    return;
  }

  const newCarro = new Veiculo(
    matricula,
    marca,
    modelo,
    tipo,
    clienteObj
  );

  veiculos.push(newCarro);

  let arrayVeiculos = JSON.stringify(veiculos);
  sessionStorage.setItem("arrayVeiculos", arrayVeiculos);

  console.log(veiculos);

  alerta("Veículo adicionado!", "Sucesso!", "success");
}

function addFuncionario(){
  let nome = $('#nomeFuncionario').val();
  let morada = $('#moradaFuncionario').val();
  let nif = $('#nifFuncionario').val();
  let telefone = $('#telefoneFuncionario').val();
  let nfuncionario = $('#nfuncionario').val();
  let funcao = $('#tipoFuncionarioSelect').val();

  if(funcao == "-1" ||!funcao){
    alerta("Tem de selecionar um cargo!","Erro","error");
    return
  }

  if(!validaNF(nfuncionario,funcionarios)){
    alerta("Número de Funcionário indicado já existe!","Erro","error");
    return
  }

  const newFunc = new Funcionario(
    nome,
    morada,
    nif,
    telefone,
    nfuncionario,
    funcao
  );

  funcionarios.push(newFunc);

  let arrayFunc = JSON.stringify(funcionarios);
  sessionStorage.setItem("arrayFuncionarios",arrayFunc);

  console.log(funcionarios);

  alerta("Funcionário adicionado!","Sucesso!","success");
}

function addIntervencao(){

  let veiculoIndex = parseInt($('#veiculoSelect').val());
  let funcionarioIndex = parseInt($('#funcionarioSelect').val());
  let funcionarioEscolhido = funcionarios[funcionarioIndex];
  

  let refInterve = $('#refIntervencao').val();
  let horaInterve = $('#horaIntervencao').val();
  let dataInterve = $('#dataIntervencao').val();
  let veiculoEscolhido = veiculos[veiculoIndex];
  let funcionario = funcionarioEscolhido.nome;
  let tipoInterve = $('#tipoIntervencaoSelect').val();
  
  // Para mais tarde
  let datafinal = null;
  let horafinal = null;
  let obsv = null;
  let pecasUsadas = null;

  veiculos[veiculoIndex].intervencao.push({
    refInterve,
    horaInterve,
    dataInterve,
    veiculoEscolhido: veiculoEscolhido.matricula,
    funcionario,
    tipoInterve,
    datafinal,
    horafinal,
    obsv,
    pecasUsadas
  });

  console.log(veiculos);

  sessionStorage.setItem('arrayVeiculos', JSON.stringify(veiculos));

  alerta("Intervenção adicionada!","Sucesso","success");
  TableInterv();
}

function TableInterv() {
  if ($.fn.DataTable.isDataTable('#tableIntervencao')) {
    $('#tableIntervencao').DataTable().destroy();
  }

  let txt = "";

  veiculos.forEach((veiculo, veiculoIndex) => {
    veiculo.intervencao.forEach((interv, intervIndex) => {
      txt += "<tr>";
      txt += "<th scope='row'>" + interv.refInterve + "</th>";
      txt += "<td>" + interv.dataInterve + "</td>";
      txt += "<td>" + interv.horaInterve + "</td>";
      txt += "<td>" + interv.funcionario + "</td>";
      txt += `<td><button class='btn btn-primary' onclick='info(${veiculoIndex}, ${intervIndex})'>Info</button></td>`;
      txt += `<td><button class='btn btn-success' onclick='Intervencao(${veiculoIndex}, ${intervIndex})'>Intervenção</button></td>`;
      txt += "</tr>";
    });
  });

  $('#tableIntervencao tbody').html(txt);
  $('#tableIntervencao').DataTable();
}

function info(veiculoIndex, intervIndex) {

  const veiculo = veiculos[veiculoIndex];
  const interv = veiculo.intervencao[intervIndex];
  const cliente = veiculo._cliente;

  $('#modalCliente').text(`${cliente._nome} | NIF: ${cliente._nif} | Email: ${cliente._email} | Tel: ${cliente._telemovel}`);
  $('#modalFuncionario').text(interv.funcionario);
  $('#modalEquipamento').text(`${veiculo._marca} ${veiculo._modelo} (${veiculo._matricula})`);
  $('#modalData').text(`${interv.dataInterve} às ${interv.horaInterve}`);
  $('#modalNOrdem').text(interv.refInterve);

  $('#infoModal').modal('show');
}

function Intervencao(veiculoIndex,intervIndex){

  window.veiculoIndexAtual = veiculoIndex;
  window.intervIndexAtual = intervIndex;

  const veiculo = veiculos[veiculoIndex];
  const interv = veiculo.intervencao[intervIndex];
  const cliente = veiculo._cliente;

    $('#intervCliente').text(`Nome: ${cliente._nome} || NIF: ${cliente._nif}`);
  $('#intervVeiculo').text(`Marca: ${veiculo._marca} || Modelo: ${veiculo._modelo} || Matrícula: ${veiculo._matricula}`);
  $('#intervAgendamento').text(`Data: ${interv.dataInterve} || Hora: ${interv.horaInterve} || Tipo: ${interv.tipoInterve}`);

  // Peças possíveis
  const pecas = ['Filtro de óleo', 'Óleo 5W30', 'Pastilhas travão', 'Correia distribuição'];

  $('#pecasCheckboxes').html('');
  
  pecas.forEach((peca, idx) => {
    $('#pecasCheckboxes').append(`
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="${peca}" id="peca${idx}">
        <label class="form-check-label" for="peca${idx}">${peca}</label>
      </div>
    `);
  });
 
  $('#intervencaoModal').modal('show');
}

function finalizarIntervencao() {
  const veiculoIndex = window.veiculoIndexAtual;
  const intervIndex = window.intervIndexAtual;

  const veiculo = veiculos[veiculoIndex];
  const interv = veiculo.intervencao[intervIndex];

  // Obter valores dos inputs
  const dataFinal = $('#dataFinal').val();
  const horaFinal = $('#horaFinal').val();
  const observacoes = $('#obsInterv').val();

  // Obter peças selecionadas
  const pecasSelecionadas = [];
  $('#pecasCheckboxes input[type="checkbox"]:checked').each(function () {
    pecasSelecionadas.push($(this).val());
  });

  // Atualizar a intervenção
  interv.datafinal = dataFinal;
  interv.horafinal = horaFinal;
  interv.obsv = observacoes;
  interv.pecasUsadas = pecasSelecionadas;

  // Atualizar sessionStorage
  sessionStorage.setItem('arrayVeiculos', JSON.stringify(veiculos));

  // Fechar modal e atualizar tabela
  $('#intervencaoModal').modal('hide');
  alerta("Intervenção finalizada com sucesso!", "Sucesso", "success");
  TableInterv();
}


function getCliente(){
  
  let txt = "<option value = '-1'>Escolha uma opção</option>";

  if(clientes.length === 0){
    let dados = JSON.parse(sessionStorage.getItem('arrayClientes'));

    if(dados){
      dados.forEach((clienteEncriptado)=>{
        let objCliente = Cliente.desencriptar(clienteEncriptado);
        clientes.push(objCliente);
      });
    }
  }
  clientes.forEach((cliente,index)=>{
    txt += "<option value = "+index+">"+cliente.nome+"</option>";
  });
$('#clienteSelect').html(txt);
$('#clienteSelect').select2();
}

function getVeiculos() {
  let txt = "<option value = '-1'>Escolha uma opção</option>";

  if (veiculos.length === 0) {
    let dados = JSON.parse(sessionStorage.getItem('arrayVeiculos'));

    if (dados) {
      dados.forEach((veiculo) => {
        let objVeiculo = Object.assign(new Veiculo(), veiculo);

        veiculos.push(objVeiculo);
      });
    }
  }

  veiculos.forEach((veiculo, index) => {
    txt += "<option value = " + index + ">" + veiculo.matricula + "</option>";
  });

  $('#veiculoSelect').html(txt);
}

function getFuncionarios(){

  let txt = "<option value = '-1'>Escolha uma opção</option>";

  if(funcionarios.length === 0){
    let dados = JSON.parse(sessionStorage.getItem('arrayFuncionarios'));

    if(dados){
      dados.forEach((funcionario)=>{
        objFuncionarios = Object.assign(new Funcionario, funcionario);
        funcionarios.push(objFuncionarios);
      });
    }
  }
  funcionarios.forEach((funcionario,index)=>{
    txt += "<option value = "+index+">"+funcionario.nome+"</option>";
  });
  $('#funcionarioSelect').html(txt);
  $('#funcionarioFinal').html(txt);
}

function validaNF(val,arr){
  let flag = true;

  arr.forEach((elemento)=>{
    console.log("Comparar:",elemento.nfunc ,"com", val);
    if(val == elemento.nfunc){
      flag = false;
    }
  });
  return flag;
}

function validaNIF(val, arr) {
  let flag = true;

  arr.forEach((elemento) => {
    console.log("Comparar:",elemento.nif ,"com", val);
    if (val == elemento.nif) {
      flag = false;
    }
  });
  return flag;
}

function validaCarro(val, arr){
  let flag = true;

  arr.forEach((elemento)=>{
    console.log("Comparar:",elemento.matricula ,"com", val);
    if(val == elemento.matricula){
      flag = false;
    } 
  });
  return flag;
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