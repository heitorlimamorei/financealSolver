import { createContext, useState, useEffect } from "react";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import FinProfileModel from "../../model/FinProfileModel";
import useAuth from "../hook/useAuth";
import PlanilhaModel from "../../model/PlanilhaModel";
interface AppContextProps {
  finProfile: FinProfileModel;
  planilha: PlanilhaModel
  newPlanilha: (planilha) => any
  tema: string;
  alternarTema: () => void;
  newFinProfile: (profile: FinProfileModel) => void;
}
type AppContextProvider = {
  children: any;
};
const finProfileMock = FinProfileModel.getWhiteProfile();

const AppContext = createContext<AppContextProps>({
  finProfile: finProfileMock,
  tema: "",
  planilha: PlanilhaModel.planilhaEmBraco(),
  alternarTema: null,
  newFinProfile: null,
  newPlanilha: null
});

export function AppContextProvider(props: AppContextProvider) {
  const { usuario } = useAuth();
  const [tema, setTema] = useState("");
  const [planilha, setPlanilha] = useState(PlanilhaModel.planilhaEmBraco())
  const [finProfile, setFinProfile] = useState(
    FinProfileModel.getWhiteProfile()
  );
  function alternarTema() {
    const novoTema = tema === "dark" ? "" : "dark";
    setTema(novoTema);
    localStorage.setItem("tema", novoTema);
  }
  function newFinProfile(profile: FinProfileModel) {
    setFinProfile(profile);
  }
  function newPlanilha(planilha) {
    setPlanilha(planilha)
  }
  useEffect(() => {
    const tema = localStorage.getItem("tema");
    setTema(tema);
  }, []);
  useEffect(() => {
    newFinProfile(FinProfileModel.getWhiteProfile(usuario))
  }, [usuario]);

  return (
    <AppContext.Provider
      value={{
        finProfile,
        tema,
        alternarTema,
        newFinProfile,
        planilha,
        newPlanilha
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
