import usersRepository from "../repositories/users.repository";
import bcrypt from 'bcrypt'

interface logginDataProps{
    email: string;
    password: string;
}
interface UserProps{
    username: string;
    email:string;
    password:string;

}
async function findUser(email:string){
    const users = await usersRepository.getUsers();
    return users.find((user:UserProps) => {
        return user.email.includes(email)
    })
}
async function loggin(logginData:logginDataProps){
    function checkPassord(user:UserProps, password:string){
        return bcrypt.compareSync(logginData.password, user.password)
    }
    const user = await findUser(logginData.email)
    if(user){
        return checkPassord(user, logginData.password) ? {
            authenticated: true,
            ...user
        } : {
            authenticated: false
        }
    }

}
export default loggin
