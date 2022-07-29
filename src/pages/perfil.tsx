import Layout from '../components/template/Layout'
import useAppData from '../data/hook/useAppData'
import useAuth from '../data/hook/useAuth'


export default function Perfil() {
  const { usuario } = useAuth()
  const { tema } = useAppData()
  return (
    <div className={``}>
      <Layout titulo="Perfil de usuario" subtitulo="Gerencie suas informações aqui!">
        <div className="flex flex-col dark:text-gray-100">
          <h1>Dados</h1>
          <div className="flex mb-5 mt-5">
          <span>Nome: <strong>{usuario?.nome ?? 'Nome não definido'}</strong></span>
          <span className="ml-5">Email: <strong>{usuario?.email}</strong></span>
          <span className="ml-5">Tema definido: {tema === '' ? 'claro' : 'dark'}</span>
          </div>
          <div className="flex mb-3">
          <span>Id: <strong>{usuario?.uid}</strong></span>
          <span className="ml-5">Provedor:{usuario?.provedor === 'password' ? ' Email e senha ': 'Google'}</span>
          </div>
        </div>
      </Layout>
    </div>
  )
}
