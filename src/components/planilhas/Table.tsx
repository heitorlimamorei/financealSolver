interface TableProps{
  className?: string;
  children?:any;
}
export default function Table(props:TableProps){
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <table className={`
        h-full w-full py-2 px-1 mt-2 rounded-md shadow-2xl bg-white text-gray-700
        `}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor</th>
              <th>Tipos</th>
              <th>%</th>
              <th>Ações</th>
            </tr>
            </thead>
            <tbody className={`text-center`}>
              {props.children}
            </tbody>
        </table>
      </div>
        
    )
}