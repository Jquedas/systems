class Pessoa {

    constructor(pNome, uNome, tel, email, morada, nif){
        this._pNome = pNome;
        this._uNome = uNome;
        this._telefone = tel;
        this._email = email;
        this._morada = morada;
        this._nif = nif;
    }

    get pNome(){
        return this._pNome;
    }

    set pNome(nome){
        this._pNome = nome;
    }

    get uNome(){
        return this._uNome;
    }

    set uNome(nome){
        this._uNome = nome;
    }

    get telefone(){
        return this._telefone;
    }

    set telefone(tel){
        this._telefone = tel;
    }

    get email(){
        return this._email;
    }

    set email(email){
        this._email = email;
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

}