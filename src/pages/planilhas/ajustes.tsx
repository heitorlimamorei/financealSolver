import { useState } from "react";
import SelecionarTipo from "../../components/planilhas/SelecionarTIpo";
import FeedBackButton from "../../components/template/feedBack/FeedBackButton";
import Layout from "../../components/template/Layout";
import ProfileInput from "../../components/template/ProfileInput";
import useAppData from "../../data/hook/useAppData";
import PlanilhaModel from "../../model/PlanilhaModel";
import { db } from "../../firebase/config";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc
} from "firebase/firestore";
import useAuth from "../../data/hook/useAuth";
import { useRouter } from "next/router";
import ListaTipos from "../../components/planilhas/ListaTipos";
import TiposPersonalizadosModel from '../../model/TiposPersonalizadosModel'
import TipoItem from "../../components/planilhas/TipoItem";
import NotFound from "../../components/planilhas/NotFound";
interface GastoInterface {
  nome: string;
  valor: number;
  tipo: string;
}
export default function AjustarPlanilha() {
  const router = useRouter();
  const { planilha, newPlanilha, finProfile } = useAppData();
  const [valorTotal, setValorTotal] = useState<number>(planilha.valorTotal);
  const [nome, setNome] = useState<string>(planilha.nome);
  const [tipo, setTipo] = useState<string>(planilha.tipo);
  const [novoTipo, setNovoTipo] = useState<string>(null)
  const [arrayDeGastos, setArrayDeGastos] = useState<GastoInterface[]>([]);
  const [tiposPersonalizados, setTiposPersonalizados] = useState(TiposPersonalizadosModel.carregarArrayExistente(planilha.arrayDeTipos))
  const { usuario } = useAuth();
  async function carregarPlanilha(id: string) {
    if (id) {
      let arrayDeGastos = [];
      const PlanilhaRef = collection(
        db,
        `planilhasdegastos/${id}/planilhadados`
      );
      const docRef = doc(db, `planilhasdegastos/${id}`);
      const planilha = await getDoc(docRef);
      if (planilha.exists().valueOf()) {
        const planilhaDados = await getDocs(PlanilhaRef);
        planilhaDados.forEach((gasto) => {
          arrayDeGastos.push({
            ...gasto.data(),
            id: gasto.id,
          });
        });
        newPlanilha(
          PlanilhaModel.planilhaEmBraco().fromFirebase({
            id: planilha.id,
            arrayDeGastos: arrayDeGastos,
            valorTotal: finProfile.salarioBruto,
            tipos: planilha.data().tipos,
            ...planilha.data(),
          })
        );
      }
    } else {
      window.alert("Não é possivel pesquisar codigos em branco!");
    }
  }
  function getFinProfileArrayDeGastos() {
    let arrayDeGastos = finProfile.getArrayGastos();
    return arrayDeGastos.map((gasto) => {
      return {
        nome: gasto.name,
        valor: Number((gasto.valor / gasto.parcelas).toFixed(2)),
        tipo:
          gasto.name === "Plano de saúde" || gasto.name === "Plano dependentes"
            ? "Planos de Saúde"
            : "Tributos",
      };
    });
  }
  async function criarGasto(nome: string, valor: number, tipo: string, id:string) {
    const subColletionRef = collection(
      db,
      `planilhasdegastos/${id}/planilhadados`
    );
    const docRef = await addDoc(subColletionRef, { nome, valor, tipo });
  }
  function irParaPlanilha() {
    if (tipo === "pessoal") {
      router.push("editar");
    } else if (tipo === "empresarial") {
    }
  }
  async function editarPlanilha() {
    const planilhaRef = doc(db, `planilhasdegastos/${planilha.id}`)
    async function processarGastos(id:string) {
        arrayDeGastos.forEach(async (gasto) => {
            await criarGasto(gasto.nome, gasto.valor, gasto.tipo, id);
        })
    }
    const subColletionRef = collection(
      db,
      `planilhasdegastos/${planilha.id}/planilhadados`
    );
    await processarGastos(planilha.id);
    await updateDoc(planilhaRef,{
        nome: nome,
        tipos: [...tiposPersonalizados.toFirebase()],
        valorTotal: valorTotal
    })
    await carregarPlanilha(planilha.id);
    irParaPlanilha()
  }
  function renderTiposDeGastos(){
    return tiposPersonalizados.arrayDeTipos.map((tipo) =>{
      return <TipoItem texto={tipo.nome} key={tipo.id} id={tipo.id} deleteMe={() => setTiposPersonalizados(tiposPersonalizados.deleteTipo(tipo.id))} />
    })
  }
  return (
    <div>
      <Layout titulo="Ajustar planilha" subtitulo="">
        {
          planilha.id ? (
            <>
             <div
          className={`
                flex flex-col justify-center items-center w-full h-full
                `}
        >
          <div
            className={`
                flex flex-col justify-center items-center  h-full
                `}
          >
            <ProfileInput
              tipo="string"
              valor={nome}
              setValor={setNome}
              placeholder={"Digite o nome"}
              className={"w-full"}
            />
            <ProfileInput
              tipo="number"
              valor={valorTotal}
              setValor={setValorTotal}
              placeholder="Receitas totais"
              className={"w-full"}
            />
            <FeedBackButton
              text="Importar dados do perfil financeiro"
              onClick={() => setArrayDeGastos(getFinProfileArrayDeGastos())}
              className="text-gray-100 bg-green-600"
            />
            <div className="flex w-full mt-2 mb-2">
            <ProfileInput
              tipo="string"
              valor={novoTipo}
              setValor={setNovoTipo}
              placeholder="Cadastrar novo tipo"
              className={"w-2/3 m-0 mt-2 mb-2"}
            />
            <button 
            className="flex w-1/3 m-1 text-sm py-0 items-center justify-center  px-2 bg-green-500 text-white rounded-full"
            onClick={() => {
              setTiposPersonalizados(tiposPersonalizados.setNewTipo(novoTipo))
              setNovoTipo(null)
            }}
            >
              Salvar 
            </button>
            </div>
            <ListaTipos>
              {renderTiposDeGastos()}
            </ListaTipos>
            <FeedBackButton
              text="Salvar"
              onClick={editarPlanilha}
              className="text-gray-100 bg-green-600"
            />
          </div>
        </div>
            </>
          ) : (
            <>
            <NotFound
            msg="Para ajustar uma planilha é necessario carregar uma!"
            statusErro="403"
            routes={{
              routeOne: "/planilhas",
              routeTwo: "/planilhas/criar"
            }}
            routeMsg={{
              msgOne:"Pesquise ou",
              msgTwo:"Crie uma"
            }}
            />
            </>
          )
        }
       
      </Layout>
    </div>
  );
}
