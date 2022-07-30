import Link from 'next/link'
import { CashIcone, IconeCasa, peopleIcon, identity } from '../components/icons/Icones'
import Layout from '../components/template/Layout'
export default function Home() {
  return (
    <div className={``}>
      <Layout titulo="Página inicial" subtitulo="Serviços financeiros na palma da sua mão!">
        <div  className={`flex flex-col dark:text-gray-100 overflow-hidden`}>
          <div className={`flex mt-5`}>
          <Link href={'/inss'}>
            <div className={`
            flex items-center justify-center
            m-5 py-10 px-10 bg-gray-700 dark:text-gray-800 dark:bg-gray-100 rounded-md
            cursor-pointer text-gray-100
            `}>
              <h1 className={`mr-1`}>Calcular INSS</h1>
              {peopleIcon}
            </div>
            </Link>
            <Link href={'/irpf'}>
            <div className={`
            flex items-center justify-center
            m-5 py-10 px-10 bg-gray-700 dark:text-gray-800 dark:bg-gray-100 rounded-md
            cursor-pointer text-gray-100
            `}>
              <h1 className={`mr-1`}>Calcular IRPF</h1>
              {peopleIcon}
            </div>
            </Link>
            <Link href={'/iptu'}>
            <div className={`
            flex
            m-5 py-10 px-10 bg-gray-700 dark:text-gray-800 dark:bg-gray-100 rounded-md items-center justify-center
            cursor-pointer text-gray-100
            `}>
              
              <h1 className={`mr-1`}>Calcular IPTU</h1>
              {IconeCasa}
            </div>
            </Link>
            <Link href={'/ipva'}>
            <div className={`
            flex
            m-5 py-10 px-10 bg-gray-700 dark:text-gray-800 dark:bg-gray-100 rounded-md items-center justify-center
            cursor-pointer text-gray-100
            `}>
              
              <h1 className={`mr-1`}>Calcular IPVA</h1>
              {CashIcone}
            </div>
            </Link>
          </div>
          <div className={`flex mt-5`} >
          <Link href={'/createFinProfile'}>
            <div className={`
            flex items-center justify-center
            m-5 py-10 px-10 bg-gray-700 dark:text-gray-800 dark:bg-gray-100 rounded-md
            cursor-pointer text-gray-100
            `}>
              <h1 className={`mr-1`}>Criar perfil financeiro</h1>
              {identity}
            </div>
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  )
}
