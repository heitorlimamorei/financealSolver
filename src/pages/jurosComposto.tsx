import { useState } from "react";
import JurosInput from "../components/template/JurosInput";
import JurosItem from "../components/template/JurosItem";
import Layout from "../components/template/Layout";
import ListaJurosModel from "../model/ListaJurosModel";
import ListaJurosCompostoModel from "../model/ListaJurosModel";

export default function SimularJurosCompostos() {
  
  const [capital, setCapital] = useState<number>(null);
  const [taxa, setTaxa] = useState<number>(null);
  const [tempo, setTempo] = useState<number>(null);
  const [lista, setLista] = useState<ListaJurosModel>(
    ListaJurosCompostoModel.listaEmBranco()
  );

  const renderizarLista = () => {
    return lista.gerarArrayParcelas().map((parcela) => {
      return <JurosItem ParcelaItem={parcela} key={parcela.id} />;
    });
  };
  const setArrayLista = () => {
    setLista(new ListaJurosCompostoModel(capital, taxa / 100, tempo));
  };
  return (
    <div className={``}>
      <Layout
        titulo="Simular juros compostos"
        subtitulo="Simule valorizações e desvalorizações sob juros compostos"
      >
        <div>
          <div
            className={` flex items-center justify-center w-full h-full m-2 `}
            onKeyDown={(event) => {
              event.key === 'Enter' ? setArrayLista() : false
            }}
          >
            <ul>
              <JurosInput
                capital={capital}
                setCapital={setCapital}
                taxa={taxa}
                setTaxa={setTaxa}
                tempo={tempo}
                setTempo={setTempo}
                setLista={setArrayLista}
              />
              <ul className={`overflow-y-scroll h-64`}>{renderizarLista()}</ul>
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
}
