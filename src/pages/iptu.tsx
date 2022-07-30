import { useState } from "react";
import Input from "../components/template/Input";
import Layout from "../components/template/Layout";
import useAppData from "../data/hook/useAppData";
import useFinances from "../data/hook/useFinances";
export default function CalculateInss() {
  const { finProfile} = useAppData()
  const { calcularIptu } = useFinances();
  const [valorInput, setValorInput] = useState(finProfile.iptu.imovel > 0 ? finProfile.iptu.imovel : null);
  const [iptu, setIptu] = useState(0);

  return (
    <div>
      <Layout titulo="Calcule o seu IPTU" subtitulo="Simples e rápido">
        <div className="flex flex-col justify-center items-center">
          <Input
            metodo={calcularIptu}
            valorInput={valorInput}
            setValorInput={setValorInput}
            valor={iptu}
            setValor={setIptu}
            text="valor de seu imovel"
          />
        </div>
      </Layout>
    </div>
  );
}
