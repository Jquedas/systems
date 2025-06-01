class Funcionario extends Pessoa{
  constructor(nome,morada,email,nfunc,contrato,dtnascimento,nif,nfornecedor){
    super(nome,morada,email)

    this._nfunc = nfunc;
    this._contrato = contrato;
    this._dtnascimento = dtnascimento;
    this._nif = nif;
    this._nfornecedor = nfornecedor;
  }

  get nfunc(){
    return this._nfunc;
  }

  set nfunc(nfunc){
    this._nfunc = nfunc;
  }
  
  get contrato(){
    return this._contrato;
  }

  set contrato(contrato){
    this._contrato = contrato;
  }

  get dtnascimento(){
    return this._dtnascimento;
  }

  set dtnascimento(dtnascimento){
    this._dtnascimento = dtnascimento;
  }

  get nif(){
    return this._nif;
  }

  set nif(nif){
    this._nif = nif;
  }

  get nfornecedor(){
    return this._nfornecedor;
  }

  set nfornecedor(nfornecedor){
    this._nfornecedor = nfornecedor;
  }
}