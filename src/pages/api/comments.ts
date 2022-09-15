import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
export default async function comments(req, res) {
  async function normalizarComentarios() {
    const collectionRef = collection(db, "comentarios");
    let comentarios = await getDocs(collectionRef);
    let normalizado = [];
    comentarios.forEach((comentario) => {
       normalizado.push({ id: comentario.id, data: comentario.data() });
    });
    return normalizado;
  }
  if (req.method === "POST") {
  } else if (req.method === "GET") {
    res.status(200).json(await normalizarComentarios());
  }
}
