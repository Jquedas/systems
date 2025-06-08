class Teste{

    constructor(nome, anoNascimento){
        this._nome = nome;
        this._anoNascimento = anoNascimento
    }

    get nome(){
        return this._nome
    }

    set nome(nome){
        this._nome = nome
    }

    get anoNascimento(){
        return this._anoNascimento
    }

    set anoNascimento(anoNascimento){
        this._anoNascimento = anoNascimento
    }

    calculaIdade(){
        return 2025 - this._anoNascimento;
    }


    calcular(a){
        return this._anoNascimento + a;
    }

    calcularA(a){
        this._anoNascimento += a;
    }
}