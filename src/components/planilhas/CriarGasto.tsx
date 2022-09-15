import FeedBackButton from "../template/feedBack/FeedBackButton";
import ProfileInput from "../template/ProfileInput";
import SelecionarTipo from "./SelecionarTIpo";

interface CriarGastoProps {
  editando: boolean;
  nome: string;
  setNome: (nome: string) => void;
  valor: number;
  setValor: (valor: number) => void;
  tipo: string;
  setTipo: (tipo: string) => void;
  tiposLista: string[];
  criarGasto: () => void;
  atualizarGasto: (id: string) => void;
}
export default function CriarGasto(props: CriarGastoProps) {
  return (
    <div
      className={`
        flex  items-center bg-white rounded-md p-2 w-full m-2
        `}
    >
      <ProfileInput
        valor={props.nome}
        setValor={props.setNome}
        tipo={"text"}
        placeholder="Nome do gasto"
      />
      <ProfileInput
        valor={props.valor}
        setValor={props.setValor}
        tipo={"number"}
        placeholder="Valor do gasto"
      />
      <SelecionarTipo
        tipo={props.tipo}
        setTipo={props.setTipo}
        tiposLista={props.tiposLista}
      />
      <FeedBackButton
        onClick={props.editando ? props.atualizarGasto : props.criarGasto}
        text={props.editando ? "Atualizar gasto" : "Criar Gasto"}
        className="m-2"
      />
    </div>
  );
}
