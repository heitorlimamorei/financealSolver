import { db } from "../../firebase/config";
import bcrypt from 'bcrypt'
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
interface newUserProps{
    username: string;
    email:string;
    password:string;

}
async function  getUser(userid:string) {
    const userRef = doc(db, `users/${userid}`)
    let dataDoc = await getDoc(userRef)
    return {id: dataDoc.id, ...dataDoc.data()}
}
async function createUser(newUser:newUserProps){
    const usersRef = collection(db, `users`)
    const userRef = await addDoc(usersRef, {
        username: newUser.username,
        email:newUser.email,
        password: bcrypt.hashSync(newUser.password, 5),
    })
    return {
        ...( await getUser(userRef.id) ),
        authenticated: true
    }
}
async function getUsers(){
    let normalizado = []
    const users = collection(
        db,
        `users`
    );
    let usersNn =  await getDocs(users);
    usersNn.forEach((user) => {
        normalizado.push({id: user.id, ...user.data()});
    })
    return normalizado;
}


export default {
    getUser,
    createUser,
    getUsers
}