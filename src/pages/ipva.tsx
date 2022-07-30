import { useState } from "react";
import Input from "../components/template/Input";
import Layout from "../components/template/Layout";
import useFinances from "../data/hook/useFinances";
import useAppData from "../data/hook/useAppData";

export default function CalculateInss() {
  const { finProfile} = useAppData()
  const { calcularIpva } = useFinances();
  const [valorInput, setValorInput] = useState(finProfile?.ipva.carro > 0 ? finProfile?.ipva.carro : null);
  const [ipva, setIpva] = useState(0);

  return (
    <div>
      <Layout titulo="Calcule o seu IPVA" subtitulo="Simples e rápido">
        <div className="flex flex-col justify-center items-center">
          <Input
            metodo={calcularIpva}
            valorInput={valorInput}
            setValorInput={setValorInput}
            valor={ipva}
            setValor={setIpva}
            text="valor de seu carro"
          />
        </div>
      </Layout>
    </div>
  );
}
