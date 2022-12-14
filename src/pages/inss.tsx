import { useState } from "react";
import useAppData from "../data/hook/useAppData";
import Input from "../components/template/Input";
import Layout from "../components/template/Layout";
import useFinances from "../data/hook/useFinances";
export default function CalculateInss() {
  const { finProfile} = useAppData()

  const [valorInput, setValorInput] = useState(finProfile?.salarioBruto > 0 ? finProfile?.salarioBruto : null);
  const [inss, setInss] = useState(0);
  const { calcularInss } = useFinances();
  return (
    <div>
      <Layout titulo="Calcule o seu Inss" subtitulo="Simples e rápido">
        <div className="flex flex-col justify-center items-center">
          <Input
            valor={inss}
            setValor={setInss}
            valorInput={valorInput}
            text="Digite seu salário bruto"
            setValorInput={setValorInput}
            metodo={calcularInss}
          />
        </div>
      </Layout>
    </div>
  );
}
