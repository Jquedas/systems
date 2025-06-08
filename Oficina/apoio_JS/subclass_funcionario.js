class Funcionario extends Pessoa{

    constructor(pNome, uNome, tel, email, morada, nif, nFunc, idade, tipo){
        super(pNome, uNome, tel, email, morada, nif);
        this._nFuncionario = nFunc;
        this._idade = idade;
        this._tipo = tipo;
    }

    get nFuncionario(){
        return this._nFuncionario;
    }

    set nFuncionario(nFunc){
        this._nFuncionario = nFunc;
    }

    get idade(){
        return this._idade;
    }

    set idade(idade){
        this._idade = idade;
    }

    get tipo(){
        return this._tipo;
    }

    set tipo(tipo){
        this._tipo = tipo;
    }
}