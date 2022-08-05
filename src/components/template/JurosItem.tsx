import ParcelaItemModel from "../../model/ParcelaItem"

interface JurosItemProps{
    ParcelaItem: ParcelaItemModel
}
export default function JurosItem(props:JurosItemProps){
    const { ParcelaItem } = props
    return <li className={`flex justify-center items-center bg-white p-1 md:p-2 rounded-md m-2`}>
        <div className={`flex items-center justify-center`}>
            <span className={`m-1 `}>Acumulado R${ParcelaItem.getAcumulado()}</span>
            <span className={`m-1`}>{ParcelaItem.gerPercentualAcumulado()}%</span>
            <span  className={`m-1 hidden md:flex`}>Tempo {ParcelaItem.tempo}</span>
            <span  className={`m-1`}> ganho/perda R${ParcelaItem.getGanhoOuPerda()}</span>
            <span  className={`m-1`}>  {ParcelaItem.getPercentualGanhoOuPerda()}%</span>
        </div>
    </li>
}