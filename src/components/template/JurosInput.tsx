interface JurosInputProps {
  capital: number;
  setCapital: (capital: any) => void;
  taxa: number;
  setTaxa: (taxa: number) => void;
  tempo: number;
  setTempo: (tempo: any) => void;
  setLista: (lista: any) => void;
}
export default function JurosInput(props: JurosInputProps) {
  return (
    <li>
      <div className={`flex justify-center items-center bg-white text-sm md:text-md lg:text-lg p-1 md:p-2 rounded-md m-2`}>
        <input
          type="number"
          placeholder="Capital"
          value={props.capital ?? ''}
          onChange={(event) => props.setCapital(Number(event.target.value) > 0 ? Number(event.target.value) : '')}
          className="py-2 px-4 w-full rounded-md m-1 bg-gray-100 focus:bg-white"
        />
        <input
          type="number"
          placeholder="Taxa"
          value={props.taxa ?? ''}
          onChange={(event) => props.setTaxa(Number(event.target.value))}
          className="py-2 px-4 w-full rounded-md m-1 bg-gray-100 focus:bg-white"
        />
        <input
          type="number"
          placeholder="Tempo"
          value={props.tempo ?? ''}
          onChange={(event) => props.setTempo(Number(event.target.value) > 0 ? Number(event.target.value) : '')}
          className="py-2 px-4 w-full rounded-md m-1 bg-gray-100 focus:bg-white"
        />
         <button className={`px-4 py-2 w-full bg-green-500 text-white hover:bg-green-400 rounded-xl `} onClick={props.setLista}>Simular</button>
      </div>
     
    </li>
  );
}
