export default function useFinances(){
    function calcularInss(valor: number): number {
        let valorInss = 0;
        if (valor <= 1212) {
          valorInss = valor * 0.075;
        }
        if (valor > 1212 && valor <= 2427.35) {
          valorInss = +(1212 * 0.075) + (valor - 1212) * 0.09;
        }
        if (valor >= 2427.36 && valor <= 3641.03) {
          valorInss =
            +(1212 * 0.075) + (2427.36 - 1212) * 0.09 + (valor - 2427.35) * 0.12;
        }
        if (valor >= 3641.04 && valor <= 7087.22) {
          valorInss =
            +(1212 * 0.075) +
            (2427.36 - 1212) * 0.09 +
            (3641.03 - 2427.35) * 0.12 +
            (valor - 3641.03) * 0.14;
        } else {
          if (valor > 7087.22) {
            valorInss =
              +(1212 * 0.075) +
              (2427.36 - 1212) * 0.09 +
              (3641.03 - 2427.35) * 0.12 +
              (7087.22 - 3641.03) * 0.14;
          }
        }
        return Number(valorInss.toFixed(2));
      }
      function calcularIr(valor: number, callBack = calcularInss) {
        const valorInss = () => {
          let valorInss = callBack(valor) >= 604.44 ? 604.44 : callBack(valor);
          return valor - valorInss;
        };
        let valorIr = 0;
        if (valorInss() > 1903.98) {
          if (valorInss() <= 2826.65) {
            valorIr = (valorInss() - 1903.98) * 0.075;
          }
          if (valorInss() >= 2826.66 && valorInss() <= 3751.05) {
            valorIr = (2826.65 - 1903.98) * 0.075 + (valorInss() - 2826.65) * 0.15;
          }
          if (valorInss() >= 3751.06 && valorInss() <= 4664.68) {
            valorIr =
              (2826.65 - 1903.98) * 0.075 +
              (3751.05 - 2826.65) * 0.15 +
              (valorInss() - 3751.05) * 0.225;
          }
          if (valorInss() >= 4664.69) {
            valorIr =
              (2826.65 - 1903.98) * 0.075 +
              (3751.05 - 2826.65) * 0.15 +
              (4664.68 - 3751.05) * 0.225 +
              (valorInss() - 4664.68) * 0.275;
          }
        } else {
          valorIr = 0;
        }
        return valorIr.toFixed(2);
      }
      
      const salarioLiquido = (calInss, calIr, valor:number) => {
        let salarioLiquido = valor - calInss(valor);
        salarioLiquido -= calIr(valor);
        return salarioLiquido.toFixed(2);
      };
      
      function calcularIpva(valor: number) {
        return (valor * 0.04).toFixed(2);
      }
      function calcularIptu(valor: number) {
        let valorIptu = 0;
        if (valor < 153302) {
          valorIptu = valor * (0.6 / 100);
          return valorIptu.toFixed(2);
        }
        if (valor > 153302 && valor < 383258) {
          valorIptu = valor * (0.7 / 100);
          return valorIptu.toFixed(2);
        }
        if (valor > 383258 && valor < 670705) {
          valorIptu = valor * (0.75 / 100);
          return valorIptu.toFixed(2);
        }
        if (valor > 670705 && valor < 1149786) {
          valorIptu = valor * (0.8 / 100);
          return valorIptu.toFixed(2);
        }
        if (valor > 1149786 && valor < 1533050) {
          valorIptu = valor * (0.85 / 100);
          return valorIptu.toFixed(2);
        }
        if (valor > 1533050 && valor <= 1916313) {
          valorIptu = valor * (0.9 / 100);
          return valorIptu.toFixed(2);
        }
        if (valor > 1916313) {
          valorIptu = valor * (1 / 100);
          return valorIptu.toFixed(2);
        }
      }
      return {
        calcularInss,
        calcularIr,
        calcSalarioLiquido: salarioLiquido,
        calcularIpva,
        calcularIptu
      }
}
