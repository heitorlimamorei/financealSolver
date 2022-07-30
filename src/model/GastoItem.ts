export default class GastoItem{
    #name: string;
    #id: any;
    #valor: number;
    #parcelas: number;
    #salrioBruto: number;
    constructor(name: string, id: any, valor: number, parcelas = 1, salrioBruto){
        this.#name = name;
        this.#id = id;
        this.#valor = valor;
        this.#parcelas = parcelas;
        this.#salrioBruto = salrioBruto;
    }
    getPercentual(){
        return Math.round((this.#valor / this.#parcelas) / this.#salrioBruto * 100)
    }
    get name() {
        return this.#name
    }
    get id() {
        return this.#id
    }
    get valor() {
        return this.#valor
    }
    get parcelas() {
        return this.#parcelas
    }
    getValorMensal() {
        return this.#valor / this.#parcelas
    }
    
}