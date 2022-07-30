import { useState } from "react";
import useAppData from "../data/hook/useAppData";
import Input from "../components/template/Input";
import Layout from "../components/template/Layout";
import useFinances from "../data/hook/useFinances";
export default function CalculateInss() {
  const { finProfile} = useAppData()
  const { calcularIr } = useFinances();
  const [valorInput, setValorInput] = useState(finProfile?.salarioBruto > 0 ? finProfile?.salarioBruto : null);
  const [irpf, setIrpf] = useState(0);

  return (
    <div>
      <Layout titulo="Calcule o seu IRPF" subtitulo="Simples e rápido">
        <div className="flex flex-col justify-center items-center">
          <Input
            metodo={calcularIr}
            valorInput={valorInput}
            setValorInput={setValorInput}
            valor={irpf}
            setValor={setIrpf}
            text="Digite seu salário bruto"
          />
        </div>
      </Layout>
    </div>
  );
}
