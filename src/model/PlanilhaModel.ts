import PlanilhaItemModel from "./PlanilhaItem";

export default class PlanilhaModel {
  #id: string;
  #tipo: string; //depois mudar para "pessoal" | "empresarial"
  #nome: string;
  #quemCriou: string;
  #arrayDeGastos: PlanilhaItemModel[];
  #valorTotal: number;
  #arrayDeTipos: string[];
  constructor(
    id: string,
    tipo: string,
    nome: string,
    quemCriou: string,
    arrayDeGastos: PlanilhaItemModel[],
    valorTotal: number,
    arrayDeTipos: string[]
  ) {
    this.#id = id;
    this.#tipo = tipo;
    this.#nome = nome;
    this.#quemCriou = quemCriou;
    this.#arrayDeGastos = arrayDeGastos;
    this.#valorTotal = valorTotal;
    this.#arrayDeTipos = arrayDeTipos
  }
  get id() {
    return this.#id;
  }
  get tipo() {
    return this.#tipo;
  }
  get nome() {
    return this.#nome;
  }
  get quemCriou() {
    return this.#quemCriou;
  }
  get valorTotal(){
    return this.#valorTotal;
  }
  get arrayDeTipos() {
    return this.#arrayDeTipos
  }
  set valorTotal(newValor:number){
    this.#valorTotal = newValor;
  }
  filtrarArray(tipo:string){
    let arrayFiltrado = this
    .#converterFirebaseToLocal(this.#arrayDeGastos)
    .filter(gasto => {
      return gasto.tipo === tipo
    })
    return new PlanilhaModel(
      this.#id,
      this.#tipo,
      this.#nome,
      this.#quemCriou,
      arrayFiltrado,
      this.#valorTotal,
      this.#arrayDeTipos
    )
  }
  ordenarEmOrdemCrescente(){
    let arrayOrdenado = this
    .#converterFirebaseToLocal(this.#arrayDeGastos)
    .sort((a, b)=>{
      if(a.valor > b.valor) {
        return 1;
      } else if(a.valor < b.valor) {
        return -1
      } else {
        return 0;
      }
    })
    return new PlanilhaModel(
      this.#id,
      this.#tipo,
      this.#nome,
      this.#quemCriou,
      arrayOrdenado,
      this.#valorTotal,
      this.#arrayDeTipos
    )

  }
  getArrayDeGastos() {
    return this
    .#converterFirebaseToLocal(this.#arrayDeGastos)
    .filter(gasto => gasto.valor > 0)
  }
  somarValores(){
    let valorTotal = 0
    let arrayDeGastos = this.getArrayDeGastos()
    for(let index = 0; index < arrayDeGastos.length; index++) {
      valorTotal += arrayDeGastos[index].valor
    }
    return valorTotal
  }
  getBalance() {
    return this.#valorTotal - this.somarValores()
  }
  static planilhaEmBraco() {
    return new PlanilhaModel(null, "pessoal", "", "", [], 0, []);
  }
  fromFirebase(planilhaFirebase) {
    return new PlanilhaModel(
      planilhaFirebase.id,
      planilhaFirebase.tipo,
      planilhaFirebase.nome,
      planilhaFirebase.quemCriou,
      this.#converterFirebaseToLocal(planilhaFirebase.arrayDeGastos),
      planilhaFirebase.valorTotal,
      planilhaFirebase.tipos
    );
  }
  #converterFirebaseToLocal(listaDeGastos) : PlanilhaItemModel[] {
    return listaDeGastos.map((gasto, index) => {
      return new PlanilhaItemModel(
        gasto.id,
        gasto.nome,
        gasto.valor,
        gasto.tipo,
        this.#valorTotal
      );
    });
  }
}
