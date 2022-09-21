import { useState } from "react";
import CriarGasto from "../../components/planilhas/CriarGasto";
import Layout from "../../components/template/Layout";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import useAppData from "../../data/hook/useAppData";
import PlanilhaModel from "../../model/PlanilhaModel";
import Table from "../../components/planilhas/Table";
import TableRow from "../../components/planilhas/TableRow";
import TableCelule from "../../components/planilhas/TableCelule";
import PlanButton from "../../components/planilhas/PlanButton";
import SelecionarTipo from "../../components/planilhas/SelecionarTIpo";
import { carregarCloud, configIcon} from "../../components/icons/Icones";
import PlanCode from "../../components/planilhas/PlanCode";
import Balance from "../../components/planilhas/Balance";
import NotFound from '../../components/planilhas/NotFound'
import GastoMobile from "../../components/planilhas/mobile/Gasto";
import PlanCodeMobile from "../../components/planilhas/mobile/PlacodeMobile";
import Link from "next/link";
export default function Planilha() {
  const { planilha, newPlanilha, finProfile } = useAppData();
  const [nome, setNome] = useState(null);
  const [valor, setValor] = useState(null);
  const [tipo, setTipo] = useState("nenhum");
  const [tipoFiltro, setTipoFiltro] = useState("nenhum");
  const [editando, setEditando] = useState(false);
  const [EditandoId, setEditandoId] = useState("");
  async function carregarPlanilha(id) {
    let arrayDeGastos = [];
    const PlanilhaRef = collection(db, `planilhasdegastos/${id}/planilhadados`);
    const docRef = doc(db, `planilhasdegastos/${id}`);
    const planilha = await getDoc(docRef);

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
        valorTotal: planilha.data().valorTotal,
        tipos: planilha.data().tipos,
        ...planilha.data(),
      })
    );
  }
  async function criarGasto() {
    const subColletionRef = collection(
      db,
      `planilhasdegastos/${planilha.id}/planilhadados`
    );
    const docRef = await addDoc(subColletionRef, { nome, valor, tipo });
    carregarPlanilha(planilha.id);
    setNome(null);
    setTipo(null);
    setValor(null);
    setEditando(false);
  }
  async function atualizarGasto(gastoId) {
    const docRef = doc(
      db,
      `planilhasdegastos/${planilha.id}/planilhadados/${gastoId}`
    );
    const gastoRef = await updateDoc(docRef, { nome, valor, tipo });
    carregarPlanilha(planilha.id);
    setNome(null);
    setTipo(null);
    setValor(null);
    setEditando(false);
    setEditandoId("");
  }
  function configurarEdicao(gastoId) {
    setEditandoId(gastoId);
    setEditando(true);
    const dados = planilha
      .getArrayDeGastos()
      .filter((gasto) => gasto.id === gastoId)[0];
    setNome(dados.nome);
    setTipo(dados.tipo);
    setValor(dados.valor);
  }
  async function deletarGasto(gastoId) {
    const docRef = doc(
      db,
      `planilhasdegastos/${planilha.id}/planilhadados/${gastoId}`
    );
    const gastoRef = await deleteDoc(docRef);
    if (editando) {
      setEditando(false);
      setNome(null);
      setTipo(null);
      setValor(null);
    }
    carregarPlanilha(planilha.id);
  }
  function render() {
    return planilha.getArrayDeGastos().map((gasto) => {
      return (
        <TableRow key={gasto.id} className="cursor-pointer hover:bg-gray-200">
          <TableCelule texto={gasto.nome} />
          <TableCelule texto={`R$${gasto.valor}`} />
          <TableCelule texto={gasto.tipo} />
          <TableCelule texto={`${gasto.getPercentual()}%`} />
          <TableCelule texto="">
            <div className="flex items-center justify-center">
              <PlanButton
                texto="Editar"
                onClick={() => configurarEdicao(gasto.id)}
                className={`bg-green-500 hover:bg-green-400`}
              />
              <PlanButton
                texto="Deletar"
                onClick={() => deletarGasto(gasto.id)}
                className={`bg-red-500 hover:bg-red-400`}
              />
            </div>
          </TableCelule>
        </TableRow>
      );
    });
  }
  function renderMobile() {
    return planilha.getArrayDeGastos().map((gasto) => {
      return (
        <GastoMobile
          nome={gasto.nome}
          tipo={gasto.tipo}
          valor={`${gasto.valor}`}
          editar={() => configurarEdicao(gasto.id)}
          deletar={() => deletarGasto(gasto.id)}
          key={gasto.id}
        />
      );
    });
  }
  const tiposDeGastos = [...planilha.arrayDeTipos, "nenhum"];
  function configurarFiltro(tipo) {
    setTipoFiltro(tipo);
    if (tipo === "nenhum") {
      carregarPlanilha(planilha.id);
    } else {
      newPlanilha(planilha.filtrarArray(tipo));
    }
  }
  const placodeRender = () => {
    return planilha.id ? (
      <div className="flex justify-start w-full">
        <PlanCode code={planilha.id} className={`hidden md:flex`}/>
        <Balance valor={planilha.getBalance().toFixed(2)} className={`hidden lg:flex`}/>
        <PlanCodeMobile code={planilha.id} className={`md:hidden`}/>
        
        <button className="ml-1 hover:text-gray-600 dark:text-gray-100">
        <Link href="ajustes">
        {configIcon(8)}
        </Link>
        </button>
      </div>
    ) : (
      <></>
    )
  };
  return (
    <div className={``}>
      <Layout titulo="" subtitulo="" addChild={placodeRender()}>
        {
          planilha.id ? (
            <>
            <div
          className={`
        hidden
        mt-1
        lg:flex flex-col items-center justify-center w-full h-full
        `}
        >
          <CriarGasto
            editando={editando}
            nome={nome ?? ""}
            setNome={setNome}
            valor={valor ?? ""}
            setValor={setValor}
            tipo={tipo}
            setTipo={setTipo}
            tiposLista={tiposDeGastos}
            criarGasto={criarGasto}
            atualizarGasto={() => atualizarGasto(EditandoId)}
          />
          <div className="flex w-full items-center justify-end">
            <SelecionarTipo
              tipo={tipoFiltro}
              setTipo={(tipo) => {
                configurarFiltro(tipo);
              }}
              tiposLista={tiposDeGastos}
            />
            <PlanButton
              texto="Ordenar"
              onClick={() => newPlanilha(planilha.ordenarEmOrdemCrescente())}
              className={`bg-green-400 text-white`}
            />
            <PlanButton
              texto=""
              onClick={() => carregarPlanilha(planilha.id)}
              className={`bg-green-600 text-white`}
            >
              {carregarCloud}
            </PlanButton>
          </div>
          <Table>
            {render()}
            <TableRow className="cursor-pointer hover:bg-gray-200">
              <TableCelule texto="Total" />
              <TableCelule texto={`R$${planilha.somarValores().toFixed(2)}`} />
              <TableCelule texto="Todos" />
              <TableCelule
                texto={`${(
                  (planilha.somarValores() / planilha.valorTotal) *
                  100
                ).toFixed(2)}%`}
              />
              <TableCelule texto="Ações" />
            </TableRow>
          </Table>
        </div>
        <div className="flex flex-col items-center lg:hidden">
          <span className="flex w-40 h-40 px-10 py-10 mb-2 rounded-full bg-gray-200 text-2xl text-gray-700 items-center justify-center">
            R${planilha.getBalance().toFixed(2)}
          </span>
          <CriarGasto
            editando={editando}
            nome={nome ?? ""}
            setNome={setNome}
            valor={valor ?? ""}
            setValor={setValor}
            tipo={tipo ?? "nenhum"}
            setTipo={setTipo}
            tiposLista={tiposDeGastos}
            criarGasto={criarGasto}
            atualizarGasto={() => atualizarGasto(EditandoId)}
            className={{
              div: "flex-col",
              select: "w-full",
              input: "w-full",
            }}
          />
          <ul className="w-full overflow-y-scroll h-40">
            {renderMobile()}
          </ul>
          <GastoMobile
              nome={"Total"}
              tipo={"Soma Total"}
              valor={`${planilha.somarValores().toFixed(2)}`}
              className={{editar: "md:hidden", deletar: "hidden"}}
            />
        </div>
        </>
          ): (
            <>
            <NotFound
            msg="É necessario carregar uma planilha para acessar essa tela!"
            statusErro="401"
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
  )
}
