interface showBalanceProps{
    valor: string;
    className?: string;
}
export default function ShowBalance(props:showBalanceProps){
    return <div className={`
    flex items-center bg-white rounded-md cursor-pointer
       hover:bg-gray-100 py-2 px-3  border-2 border-gray-700
       
    `}>
        <span className="text-xl">
            R${props.valor}
        </span>
    </div>
}