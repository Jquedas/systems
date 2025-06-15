function calcularVolume() {

  let volume = new FormData();
  volume.append('areabase', $('#areabase').val());
  volume.append('altura', $('#altura').val());

  $.ajax({
    url: "src/controller/controller.php",
    method: "POST",
    data: volume,
    dataType: "html",
    cache: false,
    contentType: false,
    processData: false,
  })

    .done(function (res) {
      $('#resultadoVolume').val(res);
    })
    .fail(function (jqXHR, textStatus) {
      alert("Erro: " + textStatus);
    });
};

function algoritmoLouco() {

  let nX = parseInt($('#pnumber').val());
  let nY = parseInt($('#snumber').val());
  let nZ = parseInt($('#tnumber').val());

  a = (nX + nX) ** 2;
  b = (nY * nX) + nZ;
  c = nX * nZ;

  let conta = new FormData();
  conta.append('numberA', a);
  conta.append('numberB', b);
  conta.append('numberC', c);

  $.ajax({
    url: "src/controller/controller.php",
    method: "POST",
    data: conta,
    dataType: "html",
    cache: false,
    contentType: false,
    processData: false,
  })

    .done(function (res) {
      let obj = JSON.parse(res);
      $('#resultadoConta').val(obj.resultado);
      alert(obj.informacao);
    })
    .fail(function (jqXHR, textStatus) {
      alert("Erro: " + textStatus);
    });
}

let conta = [];

function addSaldo() {

  const valor = parseFloat($('#valor').val());

  const maxDepositos = parseInt($('#qtqt').val());

  if (isNaN(maxDepositos) || maxDepositos <= 0 || maxDepositos > 12) {
    Swal.fire("Erro", "Digite uma quantidade válida entre 1 e 12", "warning");
    return;
  }

  if (isNaN(valor) || valor <= 0) {
    Swal.fire("Erro", "Digite um valor positivo para depósito", "warning");
    return;
  }

  if (conta.length >= maxDepositos) {
    Swal.fire("Limite atingido", "Você já adicionou todos os depósitos", "info");
    return;
  }

  conta.push(valor);
  console.log("Depositos:", conta);
  Swal.fire("Sucesso", `Depósito de R$ ${valor.toFixed(2)} adicionado`, "success");
}


function credito() {
  let soma = conta.reduce((total, val) => total + Number(val), 0);

  let dados = new FormData();
  dados.append('saldo', soma);

  $.ajax({
    url: "src/controller/controller.php",
    method: "POST",
    data: dados,
    dataType: "html",
    cache: false,
    contentType: false,
    processData: false,
  })
    .done(function (res) {
      $('#saldoCredito').val(res);
      Swal.fire("Sucesso", "Cálculo de saldo feito com sucesso!", "success");
    })
    .fail(function (jqXHR, textStatus) {
      alert("Erro: " + textStatus);
    });
}

/*
function calcular() {

  let dados = new FormData();
  dados.append('number1', $('#pNumero').val());
  dados.append('number2', $('#sNumero').val());
  dados.append('operacao', $('#opSelect').val());
  console.log(dados);

  $.ajax({
    url: "src/controller/controller.php",
    method: "POST",
    data: dados,
    dataType: "html",
    cache: false,
    contentType: false,
    processData: false,
  })

    .done(function (x) {

      x = x.trim();

      if ($('#opSelect').val() == 5) {
        let obj = JSON.parse(x);
        $('#resultado').val(obj.resultado);

        alert(obj.informacao);
      } else {
        $('#resultado').val(x);
      }
    })

    .fail(function (jqXHR, textStatus) {
      alert("Request failed: " + textStatus);
    });

}
*/



