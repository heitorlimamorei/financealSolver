import GastoItemEl from '../components/template/GastoItem';
import Layout from '../components/template/Layout'
import useAppData from "../data/hook/useAppData";

export default function ListaGastos() {
  const { finProfile} = useAppData()
  function renderizarListaDeGastos(){
    return finProfile.getArrayGastos().map(gastos => {
      return (
        <GastoItemEl gasto={gastos} />
      )
    })
  }
  return (
    <div className={``}>
      <Layout titulo="Sua lista de gastos x ganhos" subtitulo="Aqui você vai avaliar seus ganhos vs seus gastos">
        <div className={`flex flex-col w-full h-full items-center justify-center m-2 overflow-hidden`}>
          <ul>
            <li className={`w-full px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 rounded-md m-2`}><h1>Resultados de {finProfile?.name}</h1></li>
            <li className={`w-full px-4 py-2  bg-white text-gray-700 hover:bg-gray-50 rounded-md m-2`}>
              Salário base(bruto) : R${finProfile?.salarioBruto}
            </li>
            {renderizarListaDeGastos()}
            <li  className={`w-full px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 rounded-md m-2`}>
              Salário liquido : R${finProfile?.getSalarioLiquido()}
            </li>
          </ul>
        </div>
      </Layout>
    </div>
  )
}
