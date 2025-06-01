class Cliente {
  constructor(nome, nif, morada, email) {
    this._nome = nome;
    this._nif = nif;
    this._morada = morada;
    this._email = email;
  }

  get nome() {
    return this._nome;
  }

  set nome(nome) {
    this._nome = nome;
  }

  get nif() {
    return this._nif;
  }

  set nif(nif) {
    this._nif = nif;
  }

  get morada() {
    return this._morada;
  }

  set morada(morada) {
    this._morada = morada;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }
}
