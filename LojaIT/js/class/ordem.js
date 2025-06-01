class Ordem {
  constructor(data,equipamento,nordem,cliente,funcionario){
    this._data = data;
    this._equipamento = equipamento;
    this._nordem = nordem;
    this._cliente = cliente;
    this._funcionario = funcionario;
    this._material = [];
  }

  get data(){
    return this._data;
  }

  set data(data){
    this._data = data;
  }

  
  get equipamento(){
    return this._equipamento;
  }

  set equipamento(equipamento){
    this._equipamento = equipamento;
  }

  
  get nordem(){
    return this._nordem;
  }

  set nordem(nordem){
    this._nordem = nordem;
  }

  
  get cliente(){
    return this._cliente;
  }

  set cliente(cliente){
    this._cliente = cliente;
  }

  
  get funcionario(){
    return this._funcionario;
  }

  set funcionario(funcionario){
    this._funcionario = funcionario;
  }

  get material(){
    return this._material;
  }

  set material(material){
    this._material = material
  }
}