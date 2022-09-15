import Layout from "../../components/template/Layout";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import useAuth from "../../data/hook/useAuth";
import ProfileInput from "../../components/template/ProfileInput";
import { useState } from "react";
import useAppData from "../../data/hook/useAppData";
import PlanilhaModel from "../../model/PlanilhaModel";
import { useRouter } from "next/router";
export default function Planilhas() {
  const [planilhaNome, setPlanilhaNome] = useState(null);
  const [planilhaCodigo, setPlanilhaCodigo] = useState(null);
  const [planilhaTipo, setPlanilhaTipo] = useState<string>("pessoal");
  const { usuario } = useAuth();
  const { newPlanilha, finProfile, planilha } = useAppData();
  const router = useRouter();
  async function carregarPlanilha(id:string) {
    if(id){
      let arrayDeGastos = [];
      const PlanilhaRef = collection(db, `planilhasdegastos/${id}/planilhadados`);
      const docRef = doc(db, `planilhasdegastos/${id}`);
      const planilha = await getDoc(docRef)
      if(planilha.exists().valueOf()){
        const planilhaDados = await getDocs(PlanilhaRef)
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
            valorTotal: planilha.data().valorTotal,
            tipos: planilha.data().tipos,
            ...planilha.data(),
          })
        );
      }
    }else{
      window.alert('Não é possivel pesquisar codigos em branco!')
    }
  }
  function irParaPlanilha() {
    if (planilhaTipo === "pessoal") {
      router.push("planilhas/editar");
    } else if (planilhaTipo === "empresarial") {
    }
  }
  async function criarPlanilha() {
    router.push("planilhas/criar")
    newPlanilha(PlanilhaModel.planilhaEmBraco())
  }
  async function pesquisarPlanilha() {
    newPlanilha(PlanilhaModel.planilhaEmBraco())
    await carregarPlanilha(planilhaCodigo)
    if(planilha.id){
      irParaPlanilha()  
    } else {
      window.alert('Planilha não existe')
    }
  }
  return (
    <div>
      <Layout titulo="Crie uma planilha de gastos" subtitulo="">
        <div className="flex w-full h-full items-center pt-3">
          <ProfileInput
            valor={planilhaCodigo}
            setValor={setPlanilhaCodigo}
            tipo="string"
            placeholder="Digite o código da planilha"
            className="w-2/3"
          />
          <button
            onClick={pesquisarPlanilha}
            className={`px-4 py-2 w-1/3 bg-green-500 text-white hover:bg-green-400 rounded-xl flex items-center justify-center`}
          >
            Pesquisar 
          </button>
        </div>
        <div className="flex w-full h-full items-center">
          <ProfileInput
            valor={planilhaNome}
            setValor={setPlanilhaNome}
            tipo="string"
            placeholder="Digite o nome da planilha"
            className="w-1/2"
          />
          <select
            value={planilhaTipo ?? ""}
            onChange={(ev) => setPlanilhaTipo(ev.target.value)}
            className="py-2 px-4 m-2 rounded-md bg-gray-100 focus:bg-white"
          >
            <option value={"pessoal"}>Pessoal</option>
            <option value={"empresarial"}>Empresarial</option>
          </select>
          <button
            onClick={criarPlanilha}
            className={`px-4 py-2 w-1/2 bg-green-500 text-white hover:bg-green-400 rounded-xl `}
          >
            Criar planilha
          </button>
        </div>
      </Layout>
    </div>
  );
}
