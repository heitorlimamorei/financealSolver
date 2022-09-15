import { useEffect, useState } from "react";
import Comentario from "../components/template/feedBack/Comentario";
import Layout from "../components/template/Layout";
import ComentarioOnFeed from "../model/ComentarioOnFeed";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
export default function CommentsFeed() {
  const [comentarios, setComentarios] = useState([]);
  async function normalizarComentarios() {
    const collectionRef = collection(db, "comentarios");
    let comentarios = await getDocs(collectionRef);
    let normalizado = [];
    comentarios.forEach((comentario) => {
       normalizado.push({ id: comentario.id, data: comentario.data() });
    });
    setComentarios(
      normalizado.map((comentario) => {
        return new ComentarioOnFeed(
          comentario.id,
          comentario.data.text,
          comentario.data.userName,
          comentario.data.userImg,
          comentario.data.classificacao,
          comentario.data.verificado
        );
      })
    );
  }

  function renderComentarios() {
    return comentarios.length >= 1
      ? comentarios
          .filter(
            (comentario: ComentarioOnFeed) =>
              comentario.classificacao >= 4 || comentario.verificado
          )
          .map((comentario) => {
            return <Comentario comment={comentario} key={comentario.id} />;
          })
      : false;
  }
  useEffect(() => {
    normalizarComentarios();
  }, []);
  return (
    <div>
      <Layout titulo="" subtitulo="" >
        <div
          className={`
                flex flex-col w-full justify-content items-center 
                `}
        >
            <div className={`overflow-y-scroll h-64 overflow-x-hidden m-2`}>
            <ul className="m-4">{renderComentarios()}</ul>
            </div>
        </div>
      </Layout>
    </div>
  );
}
