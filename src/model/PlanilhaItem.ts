export default class PlanilhaItemModel {
    #id: string;
    #nome:string;
    #valor: number;
    #tipo: string;
    #valorTotal: number;
    constructor(id: string, nome: string, valor: number, tipo:string, valorTotal: number) {
        this.#id = id;
        this.#nome = nome;
        this.#valor = valor;
        this.#tipo = tipo
        this.#valorTotal = valorTotal
    }
    get id() {
        return this.#id
    }
    get nome() {
        return this.#nome
    }
    get valor() {
        return this.#valor
    }
    get tipo() {
        return this.#tipo
    }
    get valorTotal() {
        return this.#valorTotal
    }
    getPercentual(){
        return ((this.#valor / this.#valorTotal) * 100).toFixed(2)
    }
}