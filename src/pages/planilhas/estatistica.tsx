import Layout from "../../components/template/Layout";
import useAppData from "../../data/hook/useAppData";
import { Chart } from "react-google-charts";
import _ from 'lodash'
import { useEffect, useState } from "react";
interface gasto {
    id: string;
    nome: string;
    valor: number;
    tipo: string;
    valorTotal: number;
}
export default function Estatistica() {
  const [chartData, setChartData] = useState([])
  const { planilha } = useAppData();
  const loadData = (data) => {
    const agrupado = _.groupBy(data, (gasto) => gasto.tipo)
    const result  = _.map(agrupado, (gastos: gasto[], key) => {
        return [
            key,
            _.sumBy(agrupado[key], (gasto:gasto) => gasto.valor)
        ]
    }) 
    return [
        [["Tipos", "Valores Totais"], ...result]
    ]
  }
  useEffect(() => {
    const data = planilha.getArrayDeGastos()
    setChartData(loadData(data)[0])
  },[])
  const options = {
    title: "Somas dos valores de cada tipo",
  };
  return (
    <div className={`flex flex-col w-full h-full`}>
      <Layout titulo="" subtitulo="">
        <div className="flex items-center justify-center w-full h-full full mt-4">
          <Chart
            chartType="PieChart"
            data={chartData}
            width={"100%"}
            height={"400px"}
            options={options}
          />
        </div>
      </Layout>
    </div>
  );
}
