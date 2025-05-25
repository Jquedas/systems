class Cinema {
  constructor(localidade, morada, nome, codp, ref) {
    this._nome = nome;
    this._localidade = localidade;
    this._morada = morada;
    this._codp = codp;
    this._ref = ref;
    this._sessoes = [];
  }

  get localidade() {
    return this._localidade;
  }
  set localidade(localidade) {
    this._localidade = localidade;
  }

  get morada() {
    return this._morada;
  }
  set morada(morada) {
    this._morada = morada;
  }

  get nome() {
    return this._nome;
  }
  set nome(nome) {
    this._nome = nome;
  }

  get codp() {
    return this._codp;
  }
  set codp(codp) {
    this._codp = codp;
  }

  get ref() {
    return this._ref;
  }
  set ref(ref) {
    this._ref = ref;
  }

  get sessoes() {
    return this._sessoes;
  }

  set sessoes(sessoes) {
    this._sessoes = sessoes;
  }

nomefilme(){
    return this._sessoes.filme;
  }
}
