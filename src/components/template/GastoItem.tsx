import GastoItem from "../../model/GastoItem";

interface GastoItemProps {
  gasto: GastoItem;
}
export default function GastoItemEl(props: GastoItemProps) {
  return (
    <li
      className={`
      w-full px-3 md:px-4 py-2 bg-white text-gray-700 text-sm md:text-md  hover:bg-gray-50 rounded-md m-2
      `}
    >
      <div className={`flex flex-col md:flex-row items-center justify-center `}>
        <span className='m-2  text-center'><strong>{props.gasto.name}</strong></span>
        <span className='m-2  text-center'>Valor: R${props.gasto.valor}</span>
        <span className='m-2  text-center'>| Parcelado em {props.gasto.parcelas}X</span>
        <span className='m-2  text-center'>| % gasto / bruto <strong className='text-md'>{props.gasto.getPercentual()}%</strong></span>
      </div>
    </li>
  );
}
