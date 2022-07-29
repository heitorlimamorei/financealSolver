import Link from 'next/link'
import Layout from '../components/template/Layout'
export default function Home() {
  return (
    <div className={``}>
      <Layout titulo="Pagina inicial" subtitulo="Serviços financeiros na palma da sua mão!">
        <div  className={`flex flex-col dark:text-gray-100`}>
          <div className={`flex mt-5`}>
          <Link href={'/inss'}>
            <div className={`
            m-5 py-10 px-10 bg-gray-700 dark:text-gray-800 dark:bg-gray-100 rounded-md
            cursor-pointer text-gray-100
            `}>
              <h1>Calcular INSS</h1>
            </div>
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  )
}
