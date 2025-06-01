class Flor {
  constructor(nome,descricao,origem,ref,especie,qnt){
    
    this._nome = nome;
    this._descricao = descricao;
    this._origem = origem;
    this._ref = ref;
    this._especie = especie;
    this._qnt =parseInt(qnt);
  }
  
  get nome(){
    return this._nome;
  }

  set nome(nome){
    this._nome = nome;
  }

  
  get descricao(){
    return this._descricao;
  }

  set descricao(descricao){
    this._descricao = descricao;
  }

  
  get origem(){
    return this._origem;
  }

  set origem(origem){
    this._origem = origem;
  }

  
  get ref(){
    return this._ref;
  }

  set ref(ref){
    this._ref = ref;
  }

  
  get especie(){
    return this._especie;
  }

  set especie(especie){
    this._especie = especie;
  }

  get qnt(){
    return this._qnt;
  }

  set qnt(qnt){
    this._qnt = qnt;
  }

  adicionarStock(quantidade) {
  quantidade = parseInt(quantidade);
  if (!isNaN(quantidade) && quantidade > 0) {
    this.qnt += quantidade;
    return true;
  }
  return false;
}
}