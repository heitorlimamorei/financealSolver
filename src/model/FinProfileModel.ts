import useAuth from "../data/hook/useAuth";
import useFinances from "../data/hook/useFinances";
import GastoItem from "./GastoItem";

interface iptuProps{
  imovel: number;
  valorFinal: number;
}
interface ipvaProps{
  carro: number;
  valorFinal: number;
}
export default class FinProfileModel {
  #name: string;
  #salarioBruto: number;
  #dependentesNumero: number;
  #planoDeSaudeValor: number;
  #dependentesPlanoValor: number;
  #iptu: iptuProps;
  #iptuParcelamento: number;
  #ipva: ipvaProps;
  #ipvaParcelamento: number;
  #irpf: number;
  #inss: number;
  constructor(
    name:string,
    salarioBruto:number,
    dependentesNumero:number,
    planoDeSaudeValor:number,
    dependentesPlanoValor: number,
    iptu:number,
    iptuParcelamento:number,
    ipva:number,
    ipvaParcelamento:number,
  ) {
    const {calcularInss, calcularIr, calcularIptu, calcularIpva} = useFinances()
    this.#name = name;
    this.#salarioBruto = salarioBruto;
    this.#dependentesNumero = dependentesNumero;
    this.#dependentesPlanoValor = dependentesPlanoValor;
    this.#iptu = {imovel: iptu, valorFinal: Number(calcularIptu(iptu))};
    this.#iptuParcelamento = iptuParcelamento > 0 ? iptuParcelamento : 1
    this.#ipva = {carro: ipva, valorFinal: Number(calcularIpva(ipva))};
    this.#ipvaParcelamento = ipvaParcelamento > 0 ? ipvaParcelamento : 1;
    this.#planoDeSaudeValor = planoDeSaudeValor;
    this.#inss = calcularInss(this.#salarioBruto)
    this.#irpf = calcularIr(this.#salarioBruto, this.#dependentesNumero) 
  }
  static getWhiteProfile(){
    return new FinProfileModel(
         "usuario em branco", 0, 0, 0, 0, 0, 0, 0, 0, 
    )
  }
  get name() {
    return this.#name;
  }
  get salarioBruto() {
    return this.#salarioBruto;
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
  #dependenteDesconto(){
    return (this.#dependentesNumero * 2275.08) / 12
  }
  possuiDependentes() {
    return this.#dependentesNumero > 0 ? true : false;
  }
  getSalarioLiquido() {
    let gastos =
      this.dependentesPlanoValor * this.#dependentesNumero +
      this.#iptu.valorFinal / this.#iptuParcelamento +
      this.#ipva.valorFinal / this.#ipvaParcelamento +
      this.#planoDeSaudeValor + this.#inss + this.#irpf
    let valor = this.#salarioBruto - gastos
    return Math.round(valor)
  }
  getArrayGastos(){
    return [
      {name: 'INSS', valor: this.#inss, parcelas: 1},
      {name: 'IRPF', valor: this.#irpf, parcelas: 1},
      {name: 'IPVA', valor: this.#ipva.valorFinal, parcelas: this.#ipvaParcelamento},
      {name: 'IPTU', valor: this.#iptu.valorFinal, parcelas: this.#iptuParcelamento},
      {name: 'Plano de saúde', valor: this.#planoDeSaudeValor, parcelas: 1},
      {name: 'Plano dependentes', valor: this.#dependentesPlanoValor, parcelas: 1}
    ].map((item, i)=>{
      return new GastoItem(item.name, i, item.valor, item.parcelas, this.#salarioBruto)
    }).filter(item => item.valor > 0)
  }
}
