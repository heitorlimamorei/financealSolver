import ParcelaItemModel from "./ParcelaItem";

export default class ListaJurosCompostoModel {
  #capital: number;
  #taxa: number;
  #tempo: number;
  constructor(capital: number, taxa: number, tempo: number) {
    this.#capital = capital;
    this.#taxa = taxa;
    this.#tempo = tempo;
  }
  static listaEmBranco() {
    return new ListaJurosCompostoModel(0, 0, 0)
  }
  get capital(): number {
    return this.#capital;
  }
  get taxa(): number {
    return this.#taxa;
  }
  get tempo(): number {
    return this.#tempo;
  }
  gerarArrayParcelas(){
    let arrayParcelas:ParcelaItemModel[] = []
    for(let tempo = 0; tempo < this.#tempo; tempo++){
        arrayParcelas.push(
            new ParcelaItemModel(tempo, tempo + 1, this.#taxa, this.#capital)
        )
    }
    return arrayParcelas
  }
}
