class Cliente extends Pessoa{
  constructor(nome,morada,email,telefone,nascimento,nif, tipoEmp,ncliente){
    super(nome,morada,email)
    
    this._telefone = telefone;
    this._nascimento = nascimento;
    this._nif = nif;
    this._tipoEmp = tipoEmp;
    this._ncliente = ncliente;
    this._encomenda = [];
  }

  get telefone(){
    return this._telefone;
  }

  set telefone(telefone){
    this._telefone = telefone;
  }

  get nascimento(){
    return this._nascimento;
  }

  set nascimento(nascimento){
    this._nascimento = nascimento;
  }

  get nif(){
    return this._nif;
  }

  set nif(nif){
    this._nif = nif;
  }

  get tipoEmp(){
    return this._tipoEmp;
  }

  set tipoEmp(tipoEmp){
    this._tipoEmp = tipoEmp;
  }

  get ncliente(){
    return this._ncliente;
  }

  set ncliente(ncliente){
    this._ncliente = ncliente;
  }

  get encomenda(){
    return this._encomenda;
  }

  set encomenda(encomenda){
    this._encomenda = encomenda;
  }

}