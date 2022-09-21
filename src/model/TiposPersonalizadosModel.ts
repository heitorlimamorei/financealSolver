import TipoPersonalizadosModel from "./TipoPersonalizadoModel"

export default class TiposPersonalizadosModel{
    #arrayDeTipos: TipoPersonalizadosModel[]
    constructor(arrayDeTipos: TipoPersonalizadosModel[]){
        this.#arrayDeTipos = arrayDeTipos
    }
    static criarArrayPadrao(){
        let tiposLista = [
            "Saúde",
            "Lazer",
            "Games",
            "Alimentação",
            "Serviços online",
            "Serviços de streaming",
            "Compras gerais",
            "Farmácia",
            "Educação",
            "Transporte",
            "Tributos",
            "Impostos",
            "Gastos Urgentes",
        ]
        return new TiposPersonalizadosModel(tiposLista.map((tipo, i)=>{
            return new TipoPersonalizadosModel(tipo, i)
        }))
    }
    static carregarArrayExistente(array: string[]){
        return new TiposPersonalizadosModel(array.map((tipo, i)=>{
            return new TipoPersonalizadosModel(tipo, i)
        }))
    }
    get arrayDeTipos(){
        return this.#arrayDeTipos
    }
    setNewTipo(tipo:string){
        let tipos = this.#arrayDeTipos
        let nextId = tipos.length
        tipos.push(new TipoPersonalizadosModel(tipo, nextId))
        return new TiposPersonalizadosModel(tipos)
    }
    deleteTipo(id:any){
        let tiposFiltrado = this.#arrayDeTipos.filter(tipo => tipo.id !== id)
        return new TiposPersonalizadosModel(tiposFiltrado)
    }
    toFirebase(){
        return this.#arrayDeTipos.map(tipo => tipo.nome)
    }
}