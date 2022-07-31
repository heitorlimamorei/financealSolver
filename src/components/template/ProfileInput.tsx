interface InputProps {
  tempo?: boolean;
  tipo: string;
  valor: any;
  setValor?: (v: any) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}
export default function ProfileInput(props: InputProps) {
  return (
    <input
      className={` ${props.className} py-2 px-4 m-2 rounded-md bg-gray-100 focus:bg-white`}
      type={props.tipo}
      placeholder={props.placeholder}
      value={props.valor}
      onChange={(ev) =>
        props.tipo === "number"
          ? props.setValor(
              props.tempo
                ? Number(ev.target.value) > 0
                  ? Number(ev.target.value) <= 12
                    ? Number(ev.target.value)
                    : 12
                  : ""
                : Number(ev.target.value) > 0
                ? Number(ev.target.value)
                : ""
            )
          : props.setValor(ev.target.value)
      }
      disabled={props.disabled}
    />
  );
}
