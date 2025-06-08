class Cliente extends Pessoa {
  constructor(nome, morada, nif, telemovel, email, tipoEmp) {
    super(nome, morada, nif, telemovel);
    this._email = email;
    this._tipoEmp = tipoEmp;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  get tipoEmp() {
    return this._tipoEmp;
  }

  set tipoEmp(tipoEmp) {
    this._tipoEmp = tipoEmp;
  }

  static chaveSecreta = '2342';

    // Método para encriptar um cliente
static encriptar(cliente) {
  const json = JSON.stringify({
    nome: cliente.nome,
    morada: cliente.morada,
    nif: cliente.nif,
    telemovel: cliente.telemovel,
    email: cliente.email,
    tipoEmp: cliente.tipoEmp
  });
  return CryptoJS.AES.encrypt(json, Cliente.chaveSecreta).toString();
}

  // Método para desencriptar e retornar um objeto Cliente
  static desencriptar(encriptado) {
    const bytes = CryptoJS.AES.decrypt(encriptado, Cliente.chaveSecreta);
    const json = bytes.toString(CryptoJS.enc.Utf8);
    const obj = JSON.parse(json);
    return new Cliente(obj.nome, obj.morada, obj.nif, obj.telemovel, obj.email, obj.tipoEmp);
  }
}

