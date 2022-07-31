import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/template/Layout";
import ProfileInput from "../components/template/ProfileInput";
import useAppData from "../data/hook/useAppData";
import useAuth from "../data/hook/useAuth";
import FinProfileModel from "../model/FinProfileModel";

export default function CfProfile() {
  const { usuario  } = useAuth()
  const router = useRouter()
  const { newFinProfile, finProfile } = useAppData();
  const [name, setName] = useState(finProfile?.name);
  const [salarioBruto, setSalarioBruto] = useState<number>(finProfile?.salarioBruto > 0 ? finProfile?.salarioBruto : null);
  const [dependentes, setDependentes] = useState<number>(finProfile?.dependentesNumero > 0 ? finProfile?.dependentesNumero : null);
  const [planoDeSaude, setPlanoDeSaude] = useState<number>(finProfile?.planoDeSaudeValor > 0 ? finProfile?.planoDeSaudeValor : null);
  const [DepplanoDeSaude, setDepPlanoDeSaude] = useState<number>(finProfile?.dependentesPlanoValor > 0 ? finProfile?.dependentesPlanoValor : null);
  const [valorImovel, setValorImovel] = useState<number>(finProfile?.iptu.imovel > 0 ? finProfile?.iptu.imovel : null);
  const [parcelarIptu, setParcelarIptu] = useState<number>(finProfile?.iptuParcelamento > 1 ? finProfile?.iptuParcelamento : null);
  const [valorCarro, setValorCarro] = useState<number>(finProfile?.ipva.carro > 0 ? finProfile?.ipva.carro : null);
  const [parcelasIpva, setParcelasIpva] = useState<number>(finProfile?.ipvaParcelamento > 1 ? finProfile?.ipvaParcelamento : null)
  function criarPerfilFinanceiro() {
    newFinProfile(
      new FinProfileModel(
        name,
        salarioBruto,
        dependentes,
        planoDeSaude,
        DepplanoDeSaude,
        valorImovel,
        parcelarIptu,
        valorCarro,
        parcelasIpva
      )
    );
    router.push('/relatorioFin')
  }
  return (
    <div className={``}>
      <Layout
        titulo="Crie seu perfil financeiro"
        subtitulo="Aqui você vai responder um forms e criar seu perfil"
      >
        <div className={`flex flex-col w-full h-full`}>
          <ProfileInput valor={name} setValor={setName} tipo="text"  className="w-full" placeholder="Seu nome"/>
          <ProfileInput
            valor={salarioBruto ?? ''}
            tipo="number"
            setValor={setSalarioBruto}
            className="w-full"
            placeholder="Digite seu salário bruto"
            tempo={false}
          />
          <ProfileInput
            valor={dependentes ?? ''}
            tipo="number"
            setValor={setDependentes}
            className="w-full"
            placeholder="Quantos dependentes você possui ?"
          />
          <ProfileInput
            valor={planoDeSaude ?? ''}
            tipo="number"
            setValor={setPlanoDeSaude}
            className="w-full"
            placeholder="Valor do seu plano de saúde"
          />
          {finProfile.possuiDependentes() || dependentes > 0  ? (
            <ProfileInput
            valor={DepplanoDeSaude ?? ''}
            tipo="number"
            setValor={setDepPlanoDeSaude}
            className="w-full"
            placeholder="Valor do seu plano de saúde dos seus dependentes"
          />
          ) : false}
          <div className="flex w-full">
            <ProfileInput
              valor={valorImovel ?? ''}
              tipo="number"
              setValor={setValorImovel}
              className="w-1/2"
              placeholder="Valor de seu imóvel"
            />
            <ProfileInput
              valor={parcelarIptu ?? ''}
              tipo="number"
              setValor={setParcelarIptu}
              className="w-1/2"
              placeholder="X vezes pra pagar IPTU"
              tempo
            />
          </div>
          <div className="flex w-full ">
            <ProfileInput
              valor={valorCarro ?? ''}
              tipo="number"
              setValor={setValorCarro}
              className="w-1/2"
              placeholder="Valor de seu carro"
            />
            <ProfileInput
              valor={parcelasIpva ?? ''}
              tipo="number"
              setValor={setParcelasIpva}
              className="w-1/2"
              placeholder="X vezes pra pagar IPVA"
              tempo
            />
          </div>
          <button className="w-full m-2 py-2 px-4 text-gray-100 bg-green-500 hover:bg-green-300 rounded-md " onClick={criarPerfilFinanceiro}>
          Criar perfil financeiro
          </button>
        </div>
        <div>
        </div>
      </Layout>
    </div>
  );
}
