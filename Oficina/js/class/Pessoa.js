class Pessoa{

  constructor(nome,morada,nif,telemovel){
    this._nome = nome;
    this._morada = morada;
    this._nif = nif;
    this._telemovel = telemovel;
  }

  get nome(){
    return this._nome;
  }

  set nome(nome){
    this._nome = nome;
  }

  get morada(){
    return this._morada;
  }

  set morada(morada){
    this._morada = morada;
  }

  get nif(){
    return this._nif;
  }

  set nif(nif){
    this._nif = nif;
  }

  get telemovel(){
    return this._telemovel;
  }

  set telemovel(telemovel){
    this._telemovel = telemovel;
  }

}