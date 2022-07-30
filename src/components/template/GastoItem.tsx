import GastoItem from "../../model/GastoItem";

interface GastoItemProps {
  gasto: GastoItem;
}
export default function GastoItemEl(props: GastoItemProps) {
  return (
    <li
      className={`w-full px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 rounded-md m-2`}
      key={props.gasto.id}
    >
      <div className={`flex items-center justify-center`}>
        <span className='m-2'><strong>{props.gasto.name}</strong></span>
        <span className='m-2'>Valor: R${props.gasto.valor}</span>
        <span className='m-2'>| Parcelado em {props.gasto.parcelas}X</span>
        <span className='m-2'>| % gasto / bruto <strong className='text-md'>{props.gasto.getPercentual()}%</strong></span>
      </div>
    </li>
  );
}
