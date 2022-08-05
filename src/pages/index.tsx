import { CashIcone, IconeCasa, peopleIcon, identity } from '../components/icons/Icones'
import DashboardIcon from '../components/template/DashBoardIcon'
import Layout from '../components/template/Layout'
export default function Home() {
  return (
    <div className={``}>
      <Layout titulo="Página inicial" subtitulo="Serviços financeiros na palma da sua mão!">
        <div  className={`h-ful w-full flex flex-col
        `}>
          <div className={` mt-5 flex flex-col dark:text-gray-100 overflow-y-scroll h-64
        md:flex md:flex-row  md:overflow-hidden md:h-full md:flex-grow-1`}>
          <DashboardIcon 
          href='/inss'
          icon={peopleIcon}
          title="Calcular INSS"
          />
          <DashboardIcon 
          href='/irpf'
          icon={peopleIcon}
          title="Calcular IRPF"
          />
          <DashboardIcon 
          href='/iptu'
          icon={IconeCasa}
          title="Calcular IPTU"
          />
          <DashboardIcon 
          href='/ipva'
          icon={CashIcone}
          title="Calcular IPVA"
          />
         </div>
         <div className={` mt-5 flex flex-col dark:text-gray-100 overflow-y-scroll h-64
        md:flex md:flex-row  md:overflow-hidden md:h-full md:flex-grow-1`}>
          <DashboardIcon 
          href='/createFinProfile'
          icon={identity}
          title="Criar perfil financeiro"
          />
           <DashboardIcon 
          href='/jurosComposto'
          icon={CashIcone}
          title="Simular juros compostos"
          />
        </div>
        </div>
      </Layout>
    </div>
  )
}
