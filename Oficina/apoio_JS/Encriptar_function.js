const chaveSecreta = 'ABCD1234';
const dadosGuardados = [];

function registar() {
  const nome = $('#nome').val();
  const email = $('#email').val();

  const dados = { nome, email };
  const dadosString = JSON.stringify(dados);
  const dadosEncriptados = CryptoJS.AES.encrypt(dadosString, chaveSecreta).toString();

  dadosGuardados.push(dadosEncriptados);
  console.log(dadosGuardados)
  atualizarTabela();
  $('#formulario')[0].reset();
}



function atualizarTabela() {
  const $tbody = $('#tabelaRegistos tbody');
  $tbody.empty();

  $.each(dadosGuardados, function (index, encriptado) {
    const bytes = CryptoJS.AES.decrypt(encriptado, chaveSecreta);
    const dadosDesencriptados = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(dadosDesencriptados)

    const $linha = $(`
          <tr>
            <td>${index + 1}</td>
            <td>${dadosDesencriptados.nome}</td>
            <td>${dadosDesencriptados.email}</td>
          </tr>
        `);

    $tbody.append($linha);
  });
}