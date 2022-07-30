import useFinances from "../data/hook/useFinances";

export default class FinProfileModel {
  #name: string;
  #salrioBruto: number;
  #salarioLiquido: number;
  #dependentesNumero: number;
  #planoDeSaudeValor: number;
  #dependentesPlanoValor: number;
  #iptu: number;
  #iptuParcelamento: number;
  #ipva: number;
  #ipvaParcelamento: number;
  #irpf: number;
  #inss: number;
  constructor(
    name:string,
    salrioBruto:number,
    dependentesNumero:number,
    planoDeSaudeValor:number,
    dependentesPlanoValor: number,
    iptu:number,
    iptuParcelamento:number,
    ipva:number,
    ipvaParcelamento:number,
  ) {
    const {calcularInss, calcularIr} = useFinances()
    this.#name = name;
    this.#salrioBruto = salrioBruto;
    this.#salarioLiquido = this.getSalarioLiquido()
    this.#dependentesNumero = dependentesNumero;
    this.#dependentesPlanoValor = dependentesPlanoValor;
    this.#iptu = iptu;
    this.#iptuParcelamento = iptuParcelamento;
    this.#ipva = ipva;
    this.#ipvaParcelamento = ipvaParcelamento;
    this.#planoDeSaudeValor = planoDeSaudeValor;
    this.#inss = calcularInss(this.#salrioBruto)
    this.#irpf = calcularIr(this.#salrioBruto) 
  }
  static getWhiteProfile(){
    return new FinProfileModel(
        "usuario em branco", 0, 0, 0, 0, 0, 0, 0, 0, 
    )
  }
  get name() {
    return this.#name;
  }
  get salrioBruto() {
    return this.#salrioBruto;
  }
  get dependentesNumero() {
    return this.#dependentesNumero;
  }
  get planoDeSaudeValor() {
    return this.#planoDeSaudeValor;
  }
  get dependentesPlanoValor() {
    return this.#dependentesPlanoValor;
  }
  get iptu() {
    return this.#iptu;
  }
  get iptuParcelamento() {
    return this.#iptuParcelamento;
  }
  get ipva() {
    return this.#ipva;
  }
  get ipvaParcelamento() {
    return this.#ipvaParcelamento;
  }
  get inss(){
    return this.#inss
  }
  get irpf(){
    return this.#irpf
  }
  possuiDependentes() {
    return this.#dependentesNumero > 0 ? true : false;
  }
  getSalarioLiquido() {
    let gastos =
      this.dependentesPlanoValor * this.#dependentesNumero +
      this.#iptu / this.#iptuParcelamento +
      this.#ipva / this.#ipvaParcelamento +
      this.#planoDeSaudeValor + this.#inss + this.#irpf
    let valor = this.#salrioBruto - gastos
    return valor
  }
}
