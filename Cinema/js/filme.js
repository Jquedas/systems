class Filme {
  constructor(nome, ref, ano, realizador, resumo) {
    this._nome = nome;
    this._ref = ref;
    this._ano = ano;
    this._realizador = realizador;
    this._resumo = resumo;
  }
  get nome() {
    return this._nome;
  }
  set nome(nome) {
    this._nome = nome;
  }

  get ref() {
    return this._ref;
  }
  set  ref(ref) {
    this._ref =  ref;
  }

  get ano() {
    return this._ano;
  }
  set ano(ano) {
    this._ano = ano;
  }

  get realizador() {
    return this._realizador;
  }
  set realizador(realizador) {
    this._realizador = realizador;
  }

  get resumo() {
    return this._resumo;
  }
  set resumo(resumo) {
    this._resumo = resumo;
  }
}
