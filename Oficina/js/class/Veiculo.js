class Veiculo {
  constructor(matricula, marca, modelo, tipoveiculo, cliente) {
    this._matricula = matricula;
    this._marca = marca;
    this._modelo = modelo;
    this._tipoveiculo = tipoveiculo;
    this._cliente = cliente;
    this._intervencao = [];
  }

  get matricula() {
    return this._matricula;
  }

  set matricula(matricula) {
    this._matricula = matricula;
  }

  get marca() {
    return this._marca;
  }

  set marca(marca) {
    this._marca = marca;
  }

  get modelo() {
    return this._modelo;
  }

  set modelo(modelo) {
    this._modelo = modelo;
  }

  get tipoveiculo() {
    return this._tipoveiculo;
  }

  set tipoveiculo(tipoveiculo) {
    this._tipoveiculo = tipoveiculo;
  }

  get cliente() {
    return this._cliente;
  }

  set cliente(cliente) {
    this._cliente = cliente;
  }

  get intervencao() {
    return this._intervencao;
  }

  set intervencao(intervencao) {
    this._intervencao = intervencao;
  }
}