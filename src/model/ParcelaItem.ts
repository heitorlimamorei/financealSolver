export default class ParcelaItemModel{
    #id: any
    #tempo:number;
    #taxa:number
    #capital: number
    constructor(id:any, tempo:number, taxa: number, capital ){
        this.#id = id;
        this.#tempo = tempo;
        this.#taxa = taxa;
        this.#capital = capital;
    }
    get id() {
        return this.#id
    }
    get tempo() {
        return this.#tempo
    }
    get taxa() {
        return this.#taxa
    }
    get capital() {
        return this.#capital
    }
    getAcumulado() {
        return (this.#capital * Math.pow((1 + this.taxa), this.#tempo)).toFixed(2)
    }
    getGanhoOuPerda(){
        let atual = this.#capital * Math.pow((1 + this.#taxa), this.#tempo)
        let anterior =  this.#capital * Math.pow((1 + this.#taxa), this.#tempo - 1)
        return  (atual - anterior).toFixed(2)
    }
    gerPercentualAcumulado(){
        let atual = this.#capital * Math.pow((1 + this.#taxa), this.#tempo)
        return Number((atual / this.#capital * 100).toFixed(2))
    }
    getPercentualGanhoOuPerda(){
        let atual = this.#capital * Math.pow((1 + this.#taxa), this.#tempo)
        let anterior =  this.#capital * Math.pow((1 + this.#taxa), this.#tempo - 1)
        return Number((atual / anterior * 100).toFixed(2))
    }
}