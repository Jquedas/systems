listaUFCDS = [];
listaAlunos = [];

function getmap() {
  var map = L.map('map').setView([38.57426081561192, -7.906964873303264], 12);


  map.whenReady(() => {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([38.57426081561192, -7.906964873303264]).addTo(map);

    marker.bindPopup("Templo de Diana").openPopup();
    map.invalidateSize();
  })


}



function registaUFCD() {

  listaUFCDS.push(new UFCD(
    $('#descricaoUFCD').val(),
    $('#codUFCD').val()
  ));

  alerta("UFCD Registada", "Sucesso", "success");

  console.log(listaUFCDS);

  getUfcds();

  let x = JSON.stringify(listaUFCDS);
  sessionStorage.setItem("arrayUFCDS", x);


}

function registaAluno() {

  listaAlunos.push(new Aluno(
    $('#nomeAluno').val(),
    $('#moradaAluno').val(),
    $('#ccAluno').val(),
    $('#escolaridadeAluno').val(),
    $('#nacionalidadeAluno').val(),
    $('#telefoneAluno').val(),
    $('#emailAluno').val()
  ));

  console.log(listaAlunos);

  alerta("Registado com Sucesso", "Aluno", "success");
  selectAlunos();
}

function selectAlunos() {
  let txt = "<option value='-1'>Escolha um aluno</option>";

  listaAlunos.forEach((elemento, index) => {
    txt += "<option value='" + index + "'>" + elemento.nome + "</option>";
  });

  $('#listaAlunos').html(txt);
  $('#listaAlunos1').html(txt);
}

function getUfcds() {
  let txt = "";

  listaUFCDS.forEach((elemento, index) => {
    txt += "<tr>";
    txt += "<th scope='row'>" + (index + 1) + "</th>";
    txt += "<td>" + elemento.descricao + "</td>";
    txt += "<td>" + elemento.codigo + "</td>";
    txt += "<td><input type='checkbox' id='ufcd" + index + "' value='" + index + "'></td>";
    txt += "</tr>";
  });

  $('#listaUfcds').html(txt);
}

function registaMatricula() {

  let aluno = listaAlunos[$('#listaAlunos').val()];

  let erro = [];

  listaUFCDS.forEach((elemento, index) => {
    if ($('#ufcd' + index).is(":checked")) {
      if (validaUFCD(elemento, aluno)) {
        aluno.ufcds.push(elemento);
      } else {
        erro.push(elemento.codigo);
      }
    }
  });

  if (erro.length > 0) {
    alerta("Existiam UFCDS ja registada", "Matricula", "success");
  } else {
    alerta("Registada com Sucesso", "Matricula", "success");
  }


  listaAlunosInscritos();
  console.log(aluno);

}

function validaUFCD(ufcd, aluno) {
  let flag = true;

  aluno.ufcds.forEach((elemento) => {
    if (ufcd.codigo == elemento.codigo) {
      flag = false;
    }
  })

  return flag;
}

function listaAlunosInscritos() {

  let txt = "";

  listaAlunos.forEach((aluno, index) => {
    txt += "<tr>";
    txt += "<td>" + (index + 1) + "</td>"
    txt += "<td>" + aluno.nome + "</td>"
    txt += "<td>" + aluno.email + "</td>"
    txt += "<td>" + aluno.telefone + "</td>"
    if (aluno.ufcds.length > 0) {
      txt += "<td><button type='button' class='btn btn-info' onclick='infoAluno(" + index + ")'>Info</button></td>"
    } else {
      txt += "<td>s/ inscrições</td>"
    }
    txt += "</tr>";
  })

  $('#listaAlunosInfo').html(txt);
}

function infoAluno(index) {
  let aluno = listaAlunos[index];

  $('#infoAlunoModal').modal('show');
  $('#infoAlunoModalNome').html(aluno.nome)


  let txt = "";
  aluno.ufcds.forEach((elemento) => {
    txt += "<tr>";
    txt += "<th scope='row'>" + (index + 1) + "</th>";
    txt += "<td>" + elemento.descricao + "</td>";
    txt += "<td>" + elemento.codigo + "</td>";
    txt += "</tr>";
  });

  $('#listaUfcdsInscrito').html(txt);
  //sem funcionalidade
  $('#btnGuardaEditMatricula').attr("onclick", "guardaEdicao("+index+")")
}

function getInfoAluno(index) {

  $('#nomeAlunoEdit').val(listaAlunos[index].nome);
  $('#moradaAlunoEdit').val(listaAlunos[index].morada);
  $('#ccAlunoEdit').val(listaAlunos[index].cc);
  $('#escolaridadeAlunoEdit').val(listaAlunos[index].escolaridade);
  $('#nacionalidadeAlunoEdit').val(listaAlunos[index].nacionalidade);
  $('#telefoneAlunoEdit').val(listaAlunos[index].telefone);
  $('#emailAlunoEdit').val(listaAlunos[index].email);

  $('#btnEdit').attr("onclick", "registaAlunoEdicao(" + index + ")")
}

function registaAlunoEdicao(index) {

  listaAlunos[index].nome = $('#nomeAlunoEdit').val();
  listaAlunos[index].morada = $('#moradaAlunoEdit').val();
  listaAlunos[index].cc = $('#ccAlunoEdit').val();
  listaAlunos[index].escolaridade = $('#escolaridadeAlunoEdit').val();
  listaAlunos[index].nacionalidade = $('#nacionalidadeAlunoEdit').val();
  listaAlunos[index].telefone = $('#telefoneAlunoEdit').val();
  listaAlunos[index].email = $('#emailAlunoEdit').val();

  selectAlunos();
  listaAlunosInscritos();

  alerta("Dados Editados.", "Aluno", "success");

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
            `
    },
    hideClass: {
      popup: `
              animate__animated
              animate__fadeOutUp
              animate__faster
            `
    }
  });
}

//registo de aluno, ufcds e gráfico

let alunos = [];

function registarAlunosGraph() {
  alunos.push([
    $('#alunoGraph').val(),
    [
      $('#aprovadasGraph').val(),
      $('#reprovadasGraph').val(),
      $('#porConcluirGraph').val()
    ]
  ]);

  getAlunos();
  console.log(alunos);
}

function getAlunos() {

  let txt = "<option value='-1'>Escolha um aluno</option>";

  alunos.forEach((elemento, index) => {
    txt += "<option value='" + index + "'>" + elemento[0] + "</option>";
  });

  $('#listaAlunosGraph').html(txt);
}


let myLineChart = "";

function createGraph() {

  const ctx = document.getElementById('myChart');

  // Inicializa o gráfico
  myLineChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Aprovadas', 'Reprovadas', 'Por Concluir'],
      datasets: [{
        label: 'Quantidade',
        data: [0, 0, 0],
        backgroundColor: ['#4CAF50', '#F44336', '#FFC107'], // Definição das cores
        borderWidth: 1
      }]
    }
  });
}

function getDados(posicao) {
  // Atualiza os dados do gráfico diretamente sem destruir

  if (posicao == "-1") {
    myLineChart.data.datasets[0].data = [0, 0, 0];
  } else {
    myLineChart.data.datasets[0].data = alunos[posicao][1];
  }

  myLineChart.update();
}

//registo de aluno, ufcds e gráfico

$(function () {
  $('.js-example-basic-single').select2();

  $('#infoAlunoModal').on('show.bs.modal', function () {
    $("#opt").select2({
      dropdownParent: $('#infoAlunoModal')
    });
  });

  setTimeout(() => {
    createGraph();
    getmap();
  }, 1000);


});
