interface InputProps {
  valor: number;
  setValor: (ev: any) => void;
  valorInput: number;
  setValorInput: (ev: any) => void;
  text?: string;
  metodo: (ev: any) => any;
}
export default function Input(props: InputProps) {
  const renderizarValor = () => {
    let valorF = props.metodo(props.valorInput);
    props.setValor(valorF);
  };
  return (
    <div
      className="flex flex-col h-full justify-center items-center mt-2"
      onKeyDown={(ev) => {
        if (ev.key === "Enter") {
          renderizarValor();
        }
      }}
    >
      <h1 className="text-gray-800 dark:text-gray-200 font-semibold text-xl">
        Você deve pagar
      </h1>
      <div className="flex justify-center items-center px-5 py-5 m-1 h-15 bg-gray-200 rounded-full">
        <span>R${props.valor}</span>
      </div>
      <input
        type="number"
        placeholder={props.text}
        value={props.valorInput ?? ""}
        onChange={(ev) =>
          props.setValorInput(
            Number(ev.target.value) > 0 ? Number(ev.target.value) : ""
          )
        }
        className={` bg-gray-100 rounded-md py-2 px-4 m-1 h-15 focus:bg-white w-full
        `}
      />
      <button
        onClick={renderizarValor}
        className={`
        bg-green-400 py-2 px-4 w-full rounded-md mt-2  h-15 hover:bg-green-500 
        `}
        disabled={props.valorInput > 0 ? false : true}
      >
        Gerar valor
      </button>
    </div>
  );
}
