import Layout from '../components/template/Layout'
import ProfileInput from '../components/template/ProfileInput'
import useAppData from '../data/hook/useAppData'
import useAuth from '../data/hook/useAuth'


export default function Perfil() {
  const { usuario } = useAuth()
  const { tema, finProfile } = useAppData()
  return (
    <div className={``}>
      <Layout titulo="Perfil de usuario" subtitulo="Gerencie suas informações aqui!">
        <div className="flex flex-col dark:text-gray-100 overflow-hidden">
          <h1>Dados</h1>
          <div className="flex mb-5 mt-5 w-full">
          <ProfileInput 
          tipo="text"
          valor={`Nome: ${finProfile.name}`}
          disabled
          className='dark:text-gray-800 w-1/3'
          />
          <ProfileInput 
          tipo="text"
          valor={`Email: ${usuario?.email}`}
          disabled
          className='dark:text-gray-800 w-1/3'
          />
          <ProfileInput 
          tipo="text"
          valor={`Tema definido: ${tema === '' ? 'claro' : 'dark'}`}
          disabled
          className='dark:text-gray-800 w-1/3'
          />
          </div>
          <div className="flex mb-3 w-full">
          <ProfileInput 
          tipo="text"
          valor={`Id: ${usuario?.uid}`}
          disabled
          className='dark:text-gray-800 w-1/3'
          />
            <ProfileInput 
          tipo="text"
          valor={`Provedor: ${usuario?.provedor === 'password' ? ' Email e senha ': 'Google'}`}
          disabled
          className='dark:text-gray-800 w-1/3'
          />
          <ProfileInput 
          tipo="text"
          valor={`Salário cadastrado R$${finProfile.salarioBruto}`}
          disabled
          className='dark:text-gray-800 w-1/3'
          />
          </div>
          <div className={`flex mb-5 w-full`}>
          <ProfileInput 
          tipo="text"
          valor={` Razão liquido / bruto : ${((finProfile?.getSalarioLiquido() / finProfile?.salarioBruto) * 100).toFixed(2)}%`}
          disabled
          className='dark:text-gray-800 w-1/3'
          />
          <ProfileInput 
          tipo="text"
          valor={`Salário líquido R$${finProfile.getSalarioLiquido()}`}
          disabled
          className='dark:text-gray-800 w-1/3'
          />
          <ProfileInput 
          tipo="text"
          valor={
            finProfile.possuiDependentes() ?
            `Possui ${finProfile.dependentesNumero} dependentes`
            : 'Não possui dependentes cadastrados'
          }
          disabled
          className='dark:text-gray-800 w-1/3'
          />
          </div>
        </div>
      </Layout>
    </div>
  )
}
