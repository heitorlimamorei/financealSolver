interface SelecionarTipoProps {
  tipo: string;
  setTipo: (tipo: string) => void;
  tiposLista: string[];
  className?: string;
}
export default function SelecionarTipo(props: SelecionarTipoProps) {
  function renderizarTipos() {
    return props.tiposLista.map((tipo, i) => {
      return (
        <option value={tipo} key={i * 10}>
          {tipo}
        </option>
      );
    });
  }
  return (
    <select
      value={props.tipo}
      onChange={(ev) => props.setTipo(ev.target.value)}
      className={`py-2 px-4 m-2 rounded-md bg-gray-100 focus:bg-white cursor-pointer ${props.className}`}
    >
      {renderizarTipos()}
    </select>
  );
}
