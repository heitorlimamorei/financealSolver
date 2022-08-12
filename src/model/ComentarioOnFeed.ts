export default class ComentarioOnFeed{
    #text: string;
    #userName: string;
    #userImg: string;
    #classificacao:number;
    #verificado: boolean;
    #id: any;
    constructor(id:any, text: string, userName: string, userImg: string, classificacao:number, verificado: boolean){
        this.#text = text;
        this.#userName = userName;
        this.#userImg = userImg;
        this.#classificacao = classificacao;
        this.#verificado = verificado;
        this.#id = id;
    }
    get text(){
        return this.#text;
    }
    get userName(){
        return this.#userName;
    }
    get userImg(){
        return this.#userImg;
    }
    get classificacao(){
        return this.#classificacao
    }
    ClassificacaoPositiva(){
        return this.#classificacao > 3 ? true : false;
    }
    get verificado(){
        return this.#verificado
    }
    get id(){
        return this.#id
    }
    setVerificado(valor){
        return new ComentarioOnFeed(this.#id, this.#text, this.#userName, this.#userImg, this.#classificacao, valor)
    }
}