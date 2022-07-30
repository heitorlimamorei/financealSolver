import { useState } from "react";
import Input from "../components/template/Input";
import Layout from "../components/template/Layout";
import useFinances from "../data/hook/useFinances";
export default function CalculateInss() {
  const { calcularIptu } = useFinances();
  const [valorInput, setValorInput] = useState(null);
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
