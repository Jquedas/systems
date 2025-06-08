class Funcionario extends Pessoa {
  constructor(nome, morada, nif, telemovel, nfunc, tipoEmpregado) {
    super(nome, morada, nif, telemovel);

    this._nfunc = nfunc;
    this._tipoEmpregado = tipoEmpregado;
  }

  get nfunc() {
    return this._nfunc;
  }

  set nfunc(nfunc) {
    this._nfunc = nfunc;
  }

  get tipoEmpregado() {
    return this._tipoEmpregado;
  }

  set tipoEmpregado(tipoEmpregado) {
    this._tipoEmpregado = tipoEmpregado;
  }
}
