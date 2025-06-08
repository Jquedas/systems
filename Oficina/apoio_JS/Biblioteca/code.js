let leitores = [];
let livros = [];
let bibliotecarios = [];

let link = window.location.pathname;
console.log(link);

if (link == "/emprestimo.html") {
  if (sessionStorage.getItem("arrayBibliotecario") != null) {
    let dados = JSON.parse(sessionStorage.getItem("arrayBibliotecario"));

    dados.forEach((bibliotecario) => {
      let objBiblio = Object.assign(new Bibliotecario(), bibliotecario);
      console.log(objBiblio);
      bibliotecarios.push(objBiblio);
    });
  }
}

if (link == "/emprestimo.html") {
  if (sessionStorage.getItem("arrayLeitor") != null) {
    let dados = JSON.parse(sessionStorage.getItem("arrayLeitor"));

    dados.forEach((leitor) => {
      let objLeitor = Object.assign(new Leitor(), leitor);
      console.log(objLeitor);
      leitores.push(objLeitor);
    });
  }
}

if (link == "/emprestimo.html") {
  if (sessionStorage.getItem("arrayLivros") != null) {
    let dados = JSON.parse(sessionStorage.getItem("arrayLivros"));

    dados.forEach((livro) => {
      let objLivro = Object.assign(new Livro(), livro);
      console.log(objLivro);
      livros.push(objLivro);
    });
  }
}

if (link == "/livro.html") {
  if (sessionStorage.getItem("arrayLivros") != null) {
    dados = JSON.parse(sessionStorage.getItem("arrayLivros"));

    dados.forEach((livro) => {
      let objLivro = Object.assign(new Livro(), livro);
      livros.push(objLivro);
    });
  }
}

function addLeitor() {
  let nome = $("#nome").val();
  let morada = $("#morada").val();
  let email = $("#email").val();
  let telefone = $("#telefone").val();
  let nascimento = $("#nascimento").val();
  let nleitor = $("#nleitor").val();
  let nif = $("#nif").val();

  if (
    !nome ||
    !morada ||
    !email ||
    !telefone ||
    !nascimento ||
    !nleitor ||
    !nif
  ) {
    alerta("Preencha os campos todos!", "Erro", "error");
    return;
  }

  if (validaLeitor($("#nif").val(), leitores)) {
    leitores.push(
      new Leitor(nome, morada, email, telefone, nascimento, nleitor, nif)
    );

    console.log(leitores);

    getSelects(leitores, "#leitorSelect");
    getSelects(leitores, "#leitorSelect2");

    let arrayObjs = JSON.stringify(leitores);
    sessionStorage.setItem("arrayLeitor", arrayObjs);

    alerta("Leitor Adicionado!", "Sucesso", "success");
  } else {
    alerta("NIF indicado já existe!", "Erro", "error");
  }
}

function validaLeitor(val, arr) {
  let flag = true;

  arr.forEach((leitor) => {
    if (leitor.nif == val) {
      flag = false;
    }
  });

  return flag;
}

function addLivro() {
  nome = $("#nomelivro").val();
  autor = $("#autorlivro").val();
  tipo = $("#tipoSelect").val();
  ano = $("#anolivro").val();
  edicao = $("#edicaolivro").val();
  exemplares = $("#nexemplares").val();
  estado = $("#estadoSelect").val();
  isbn = $("#isbn").val();

  if (validaLivro($("#isbn").val(), livros)) {
    livros.push(
      new Livro(nome, autor, tipo, ano, edicao, exemplares, estado, isbn)
    );

    console.log(livros);

    getSelects(livros, "#livroSelect");

    let arrayObjs = JSON.stringify(livros);
    sessionStorage.setItem("arrayLivros", arrayObjs);

    alerta("Livro Adicionado!", "Sucesso", "success");
  } else {
    alerta("ISBN indicado já existe!", "Erro", "error");
  }
}

function validaLivro(val, arr) {
  let flag = true;

  arr.forEach((livro) => {
    console.log("Comparar", val, "com", livro.isbn);
    if (livro.isbn == val) {
      flag = false;
    }
  });
  return flag;
}

function addBibliotecario() {
  nome = $("#nomebibi").val();
  morada = $("#moradabibi").val();
  email = $("#emailbibi").val();
  nfuncionario = $("#nfunc").val();
  contrato = $("#contrato").val();

  bibliotecarios.push(
    new Bibliotecario(nome, morada, email, nfuncionario, contrato)
  );

  console.log(bibliotecarios);

  getSelects(bibliotecarios, "#funcionarioSelect");

  let arrayObjs = JSON.stringify(bibliotecarios);
  sessionStorage.setItem("arrayBibliotecario", arrayObjs);

  alerta("Bibliotecario adicionado!", "Sucesso", "success");
}

function getSelects(arr, destino) {
  let txt = "<option value = '-1'>Escolha uma opção</option>";

  if (arr === livros) {
    arr.forEach((elemento, index) => {
      let nome = elemento.nome || elemento._nome;
      let qnt = elemento.exemplares || elemento._exemplares;

      if (qnt === 0 || qnt === "0") {
        qnt = "Sem livros disponíveis";
        return;
      }

      txt += `<option value = "${index}">${nome} --> ${qnt} Disponíveis</option>`;
    });
  } else {
    arr.forEach((elemento, index) => {
      txt += "<option value = '" + index + "'>" + elemento.nome + "</option>";
    });
  }
  $(destino).html(txt);
}

function registarEmprestimo() {
  let livro = $("#livroSelect").val();
  let leitor = $("#leitorSelect").val();
  let bibliotecario = $("#funcionarioSelect").val();
  let datInicio = $("#datai").val();
  let datEntrega = $("#datae").val();

  if (
    livro === "-1" ||
    leitor === "-1" ||
    bibliotecario === "-1" ||
    !datInicio ||
    !datEntrega
  ) {
    alerta("Preencha os campos todos!", "Erro", "error");
    return;
  }

  const objEmp = {
    titulo: livro,
    func: bibliotecarios[bibliotecario].nome,
    dtInicio: datInicio,
    dtEntrega: datEntrega,
  };

  livros[livro].exemplares--; // cada vaz que é feito um registo é subtraido do stock

  leitores[leitor].addEmprestimo(objEmp); // dps add atualizado

  let arrayObjs = JSON.stringify(leitores);
  sessionStorage.setItem("arrayLeitor", arrayObjs);

  let arrayLivros = JSON.stringify(livros);
  sessionStorage.setItem("arrayLivros", arrayLivros); //atualiza livros

  getSelects(livros, "#livroSelect");
  feedTableLivros(); // <- Atualiza a tabela com novos valores

  alerta("Empréstimo registado!", "Sucesso", "success");
}

function feedTableLivros() {
  let dados = JSON.parse(sessionStorage.getItem("arrayLivros"));
  console.log(dados);

  let txt = "";

  dados.forEach((livro, index) => {
    txt += "<tr>";
    txt += "<th scope='row'>" + (index + 1) + "</th>";
    txt += "<td>" + livro._nome + "</td>";
    txt += "<td>" + livro._exemplares + "</td>";
    txt += "<td>" + livro._estado + "</td>";
    txt += "</tr>";
  });

  $("#tableLivros tbody").html(txt);
}

function feedTableEmp(index) {
  if ($.fn.DataTable.isDataTable("#tableEmprestimos")) {
    $("#tableEmprestimos").DataTable().clear().destroy();
  }

  if (index == -1) {
    alerta("Selecione um Leitor", "Erro", "error");
    return;
  }

  let dados = JSON.parse(sessionStorage.getItem("arrayLeitor"));
  let livros = JSON.parse(sessionStorage.get);
  console.log(dados);

  let leitor = dados[index];
  console.log("Este foi o leitor", leitor);
  let livro = livros[parseInt(emprestimo.titulo)];

  let txt = "";

  console.log("_emprestimo:", leitor._emprestimo);

  if (!leitor._emprestimo || leitor._emprestimo.length === 0) {
    txt = "<tr><td colspan='6'>Sem empréstimos para este leitor</td></tr>";
  } else {
    leitor._emprestimo.forEach((emprestimo, i) => {
      txt += "<tr>";
      txt += "<td>" + (i + 1) + "</td>";
      txt += "<td>" + livro._nome + "</td>";
      txt += "<td>" + emprestimo.dtInicio + "</td>";
      txt += "<td>" + emprestimo.dtEntrega + "</td>";
      if (emprestimo.entregue) {
        txt +=
          "<td colspan='2'><span class='badge bg-success'>Entregue</span></td>";
      } else {
        txt +=
          "<td><input type='button' class='btn btn-info' onclick='entregaLivro(" +
          i +
          ")' value='Entregar'></td>";
        txt +=
          "<td><input type='button' class='btn btn-info' onclick='infoEleitor(" +
          i +
          ")' value='Info'></td>";
      }

      txt += "</tr>";
    });
  }
  $("#tableEmprestimos").DataTable();
  $("#tableEmprestimos tbody").html(txt);
}

function entregaLivro(indexEmprestimo) {
  let indexLeitor = $("#leitorSelect2").val();

  let leitores = JSON.parse(sessionStorage.getItem("arrayLeitor"));
  let livros = JSON.parse(sessionStorage.getItem("arrayLivros"));

  let leitor = leitores[indexLeitor];
  let emprestimo = leitor._emprestimo[indexEmprestimo];

  let indexLivro = parseInt(emprestimo.titulo);
  if (!isNaN(indexLivro)) {
    livros[indexLivro]._exemplares++;
  }

  leitor._emprestimo.splice(indexEmprestimo, 1);
  alerta("Livro Entregue", "Sucesso", "success");

  sessionStorage.setItem("arrayLeitor", JSON.stringify(leitores));
  sessionStorage.setItem("arrayLivros", JSON.stringify(livros));

  feedTableEmp(indexLeitor);
  feedTableLivros();
}

$(document).ready(function () {
  feedTableLivros();
  $("#tableLivros").DataTable();
  $("#tableEmprestimos").DataTable();

  if (link == "/livro.html") {
    $("#tipoSelect").select2();
  }

  if (link == "/emprestimo.html") {
    $("#tipoSelect").select2();
    $("#livroSelect").select2();
    $("#leitorSelect2").select2();
  }

  if (sessionStorage.getItem("arrayBibliotecario") != null) {
    getSelects(bibliotecarios, "#funcionarioSelect");
  }

  if (sessionStorage.getItem("arrayLivros") != null) {
    getSelects(livros, "#livroSelect");
  }

  if (sessionStorage.getItem("arrayLeitor") != null) {
    getSelects(leitores, "#leitorSelect");
    getSelects(leitores, "#leitorSelect2");
  }
});

function alerta(msg, titulo, icon) {
  Swal.fire({
    position: "center",
    icon: icon,
    title: titulo,
    text: msg,
    showConfirmButton: true, // mostra o botão
    confirmButtonText: "Ok", // texto do botão
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
