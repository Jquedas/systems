class Material{
  constructor(nome,cod,descricao,quantidade,data,estado){
    this._nome = nome;
    this._cod = cod;
    this._descricao = descricao;
    this._quantidade = quantidade;
    this._data = data;
    this._estado = estado;
    this._fornecedor = [];
  }

   get nome(){
    return this._nome;
  }

  set nome(nome){
    this._nome = nome;
  }

  get cod(){
    return this._cod;
  }

  set cod(cod){
    this._cod = cod;
  }

  get descricao(){
    return this._descricao;
  }

  set descricao(descricao){
    this._descricao = descricao;
  }

  get quantidade(){
    return this._quantidade;
  }

  set quantidade(quantidade){
    this._quantidade = quantidade;
  }

  get data(){
    return this._data;
  }

  set data(data){
    this._data = data;
  }

  get estado(){
    return this._estado;
  }

  set estado(estado){
    this._estado = estado;
  }
}