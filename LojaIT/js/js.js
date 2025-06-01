let materiais = [];
let clientes = [];
let ordens = [];

const chaveSecreta = '2342';

$(document).ready(function(){
  getCliente();
  ordemSelect();
  materialSelect();

});

link = window.location.pathname
console.log(link);

if(link === "/materiais.html"){
  if(sessionStorage.getItem('arrayMateriais')!=null){

    let dados = JSON.parse(sessionStorage.getItem('arrayMateriais'));

    dados.forEach((material)=>{
      arrObj = Object.assign(new Material, material)
      console.log(arrObj);
      materiais.push(arrObj);
    });
  }
}

if(link === "/ordem.html"){
  if(sessionStorage.getItem('arrayOrdens')!=null){

    let dados = JSON.parse(sessionStorage.getItem('arrayOrdens'));

    dados.forEach((ordem)=>{
      let objOrdem = Object.assign(new Ordem, ordem);
      console.log(objOrdem);
      ordens.push(objOrdem);
    });
  }
}

if(link === "/ordem.html"){
  if(sessionStorage.getItem('arrayMateriais')!=null){

    dados = JSON.parse(sessionStorage.getItem('arrayMateriais'));
  
    dados.forEach((material)=>{
      let arrMaterial = Object.assign(new Material, material);
      console.log(arrMaterial);
      materiais.push(arrMaterial);
    });
  }
}

if(link === "/cliente.html"){
  if(sessionStorage.getItem('arrayClientes')!=null){

    let dados = JSON.parse(sessionStorage.getItem('arrayClientes'));

    dados.forEach((clienteEncriptado)=>{

      // 1. Descriptografar
      const bytes = CryptoJS.AES.decrypt(clienteEncriptado, chaveSecreta);
      const clienteJSON = bytes.toString(CryptoJS.enc.Utf8);
     
      // 2. Parse do JSON para objeto
      const clienteObj = JSON.parse(clienteJSON);

       let objCliente = new Cliente(clienteObj.nome, clienteObj.nif, clienteObj.morada, clienteObj.email);
      clientes.push(objCliente);
    });
    console.log(clientes);
  }
}

if(link === "/ordem.html"){
  if(sessionStorage.getItem('arrayClientes')!=null){

    let dados = JSON.parse(sessionStorage.getItem('arrayClientes'));

    dados.forEach((clienteEncriptado)=>{
      
      // 1. Descriptografar
      const bytes = CryptoJS.AES.decrypt(clienteEncriptado,chaveSecreta);
      const clienteJSON = bytes.toString(CryptoJS.enc.Utf8);

       // 2. Parse do JSON para objeto
      const clienteObj = JSON.parse(clienteJSON);

       let objCliente = new Cliente(clienteObj.nome, clienteObj.nif, clienteObj.morada, clienteObj.email);
      clientes.push(objCliente);
    });
    console.log(clientes); 
  };
}

function ordemSelect(){

  let txt = "<option value = '-1'>Escolha uma opção</option>";

  if(ordens.length === 0){
    let dados = JSON.parse(sessionStorage.getItem('arrayOrdens'));

    if(dados){
      dados.forEach((ordem)=>{
      let arOrdem = Object.assign(new Ordem, ordem);
      ordens.push(arOrdem);
    });
    }
  }
  ordens.forEach((ord, index)=>{
    txt += "<option value ="+index+">"+ord.equipamento+"</option>";
  });
$('#ordemSelect').html(txt);  
$('#ordemSelect').select2();
}

function materialSelect(){
  let txt = "<option value = '-1'>Escolha uma opção</option>"

  if(materiais.length === 0){
    let dados = JSON.parse(sessionStorage.getItem('arrayMateriais'));

    if(dados){
      dados.forEach((material)=>{
      let arMat = Object.assign(new Material, material)
      materiais.push(arMat);
    });
    }
  }

  //console.log("Materiais disponíveis:", materiais);

  materiais.forEach((material, index)=>{
    txt+= "<option value = "+index+">"+material.nome+"</option>";
  });
$('#materialSelect').html(txt);
$('#materialSelect').select2();
}

function getCliente(){

  let txt = "<option value = '-1'>Escolha uma opção</option>"

  if(clientes.length === 0){
    let dados = JSON.parse(sessionStorage.getItem('arrayClientes'));

    if(dados){
      dados.forEach((clienteEncriptado)=>{

      // 1. Desencriptar
      let bytes = CryptoJS.AES.decrypt(clienteEncriptado,chaveSecreta);
      let clienteJSON = bytes.toString(CryptoJS.enc.Utf8);

      // 2. Parse para objeto normal
      const clienteObj = JSON.parse(clienteJSON);

      // 3. Criar instância da classe Cliente
      let objCliente = new Cliente(
        clienteObj.nome,
        clienteObj.nif,
        clienteObj.morada,
        clienteObj.email
      );

      // 4. Guardar no array global
      clientes.push(objCliente);
    });
    }
  }

  clientes.forEach((cliente,index)=>{
    txt+= "<option value = "+index+">"+cliente.nome+"</option>";
  });

$('#clienteSelect').html(txt);
$('#clienteSelect').select2();
$('#editCliente').html(txt);
}

function addMaterialOrdem() {
  const indexO = parseInt($('#ordemSelect').val());
  const ordem = ordens[indexO];

  if (!ordem) {
    alerta("Selecione uma ordem válida!", "Erro", "error");
    return;
  }

  const indexArraysM = $('#materialSelect').val(); // isto já é um array de strings (ex: ["0", "2"])

  if (!indexArraysM || indexArraysM.length === 0 || indexArraysM.includes("-1")) {
    alerta("Selecione um ou mais materiais!", "Erro", "error");
    return;
  }

  indexArraysM.forEach((imaterial) => {
    const material = materiais[parseInt(imaterial)];
    if (material) {

      ordem.material.push(material); // Adiciona à ordem
      
    }
  });
  console.log(ordens);

  alerta("Materiais adicionados à ordem!", "Sucesso", "success");

  // Atualizar sessionStorage
  sessionStorage.setItem("arrayOrdens", JSON.stringify(ordens));
}

function addMaterial(){

  let nfornecedor = $('#nomeFornecedor').val();
  let niffornecedor = $('#nifFornecedor').val();
  let moradafornecedor = $('#moradaFornecedor').val();

  let newMaterial = new Material(
    $('#nMaterial').val(),
    $('#codMaterial').val(),
    $('#descMaterial').val(),
    $('#stockMaterial').val(),
    $('#dtMaterial').val(),
    $('#estadoSelect').val(),
  );

  newMaterial._fornecedor.push({
    nome : nfornecedor,
    nif :niffornecedor,
    morada :moradafornecedor
  });

  materiais.push(newMaterial);

  materialSelect();

  console.log(materiais);

  let arrayMaterial = JSON.stringify(materiais);
  sessionStorage.setItem("arrayMateriais", arrayMaterial);

alerta("Material adicionado!!","Sucesso","success");
}

function addOrdem(){

  const index = parseInt($('#clienteSelect').val());

  if(isNaN(index)|| index < 0){
    alerta("Escolha um cliente válido!", "Erro", "error");
    return;
  }

  clienteSelecionado = clientes[index];

  nomeCliente = clienteSelecionado.nome;

  
  let newOrdem = new Ordem(
    $('#dtOrdem').val(),
    $('#equipamentoOrdem').val(),
    $('#nOrdem').val(),
    nomeCliente,
    $('#funcOrdem').val(),
  );

  ordens.push(newOrdem);

  ordemSelect();

  console.log(ordens);

  let arrayOrdem = JSON.stringify(ordens);
  sessionStorage.setItem("arrayOrdens", arrayOrdem);

  alerta("Ordem de reparação adicionada!","Sucesso","success");
  feedTable();
}

function addCliente(){

  const nome = $('#nCliente').val();
  const nif = $('#nifCliente').val();
  const morada = $('#moradaCliente').val();
  const email = $('#emailCliente').val();

  if(!validaNIF(nif)){
    alerta("NIF indicado já existe!","Erro","error");
    return
  }

  const dadosCliente = {nome,nif,morada,email};
  const dadosClienteString = JSON.stringify(dadosCliente);

  // Criptografar com a chave secreta
  const dadosEncriptados = CryptoJS.AES.encrypt(dadosClienteString,chaveSecreta).toString();

   console.log("Dados encriptados:", dadosEncriptados);  // VER OS DADOS ENCRIPTADOS
  

  // Recuperar o array já salvo ou criar um novo vazio
  let clientesEncriptados = [];
  if(sessionStorage.getItem('arrayClientes')){
    clientesEncriptados = JSON.parse(sessionStorage.getItem('arrayClientes'));
  }

  // Adicionar novo cliente encriptado
  clientesEncriptados.push(dadosEncriptados);

  // Salvar novamente no sessionStorage
  sessionStorage.setItem("arrayClientes", JSON.stringify(clientesEncriptados));

  // Adicionar o cliente instanciado no array local
  let newCliente = new Cliente(nome,nif,morada,email);
  clientes.push(newCliente);

  console.log(clientes);

  //getCliente()

  alerta("Cliente adicionado!","Sucesso","success");
}

function validaNIF(val){
  let flag = true;

  clientes.forEach((cliente)=>{
    if(val == cliente.nif){
      flag = false;
    }
  });
  return flag;
}

function feedTable(){

  if ( $.fn.DataTable.isDataTable('#tableOrdem') ) {
    $('#tableOrdem').DataTable().destroy();
  }

  let txt = "";

  ordens.forEach((ordem,index)=>{
    txt += "<tr>";
      txt += "<th scope='row'>" + ordem.nordem+ "</th>";
      txt += "<td>" + ordem.equipamento + "</td>";
      txt += "<td>" + ordem.data + "</td>";
      txt += "<td><button class='btn btn-success' onclick='EditOrdem(" + index + ")'>Editar</button></td>";
      txt += "<td><button class = 'btn btn-success' onclick = 'infoOrdem("+index+")'>Info</button></td>";
  });
$('#tableOrdem tbody').html(txt);
$('#tableOrdem').DataTable();  
}

function EditOrdem(index){

  ordem = ordens[index];

   $('#editIndex').val(index);

  getCliente();

  $('#editData').val(ordem.data);
  $('#editEquipamento').val(ordem.equipamento);
  $('#editNOrdem').val(ordem.nordem);
 
  // Tenta encontrar o índice do cliente
  const clienteIndex = clientes.findIndex(c => c.nome === ordem.cliente);
  $('#editCliente').val(clienteIndex).trigger('change');

  $('#editCliente').val(ordem.cliente);
  $('#editFuncionario').val(ordem.funcionario);

$('#editModal').modal('show');
}

function infoOrdem(index){
  let ordem = ordens[index];

  $('#modalNOrdem').text(ordem.nordem);
  $('#modalEquipamento').text(ordem.equipamento);
  $('#modalData').text(ordem.data);
  $('#modalCliente').text(ordem.cliente);
  $('#modalFuncionario').text(ordem.funcionario);

  $('#infoModal').modal('show');
}

function salvaEdicao(){

  let index = parseInt($('#editIndex').val());

  cliente = parseInt($('#editCliente').val());

  clnome = clientes[cliente].nome;

  ordens[index].nordem = $('#editNOrdem').val();
  ordens[index].equipamento = $('#editEquipamento').val();
  ordens[index].data = $('#editData').val();
  ordens[index].cliente = clnome;
  ordens[index].funcionario = $('#editFuncionario').val();

  sessionStorage.setItem("arrayOrdens", JSON.stringify(ordens));
  
  getCliente();
  feedTable();
  $('#indexOrdemEdit').modal('hide');
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