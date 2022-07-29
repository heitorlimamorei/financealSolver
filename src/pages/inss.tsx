import { useState } from "react";
import Layout from "../components/template/Layout";
import useFinances from "../data/hook/useFinances";
export default function CalculateInss() {
  const [valorInput, setValorInput] = useState(0)
  const [inss, setInss] = useState(0)
  const { calcularInss } = useFinances()
  const renderizarValor = () => {
    let inssValor = calcularInss(valorInput)
    setInss(inssValor)
  }
  return (
    <div>
      <Layout titulo="Calcule o seu Inss" subtitulo="Simples e rápido">
        <div className="flex flex-col justify-center items-center">
        <div  className="flex flex-col h-full justify-center items-center">
        <h1 className="text-gray-800 dark:text-gray-200 font-semibold text-xl">Você deve pagar</h1>
          <div className="flex justify-center items-center px-5 py-5 m-1 h-15 bg-gray-200 rounded-full">
          <span>R${inss}</span>
          </div>
        <input 
        type="number" 
        placeholder="digite seu salário bruto" 
        value={valorInput} 
        onChange={ev=> setValorInput(Number(ev.target.value))} 
        className={` bg-gray-100 rounded-md py-2 px-4 m-1 h-15 focus:bg-white w-full
        `}
        />
        <button onClick={renderizarValor} className={`
        bg-green-400 py-2 px-4 w-full rounded-md mt-2  h-15 hover:bg-green-500 
        `} disabled={valorInput > 0 ? false : true}>Gerar valor</button>
        </div>
        </div>
      </Layout>
    </div>
  );
}
