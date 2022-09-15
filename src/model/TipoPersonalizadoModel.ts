export default class TipoPersonalizadosModel{
    #id: any;
    #nome: string;
    constructor(nome: string, id: any) {
        this.#nome = nome;
        this.#id = id;
    }
    get nome(){
        return this.#nome;
    }
    get id() {
        return this.#id;
    }
}