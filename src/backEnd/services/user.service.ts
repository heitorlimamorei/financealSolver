import usersRepository from "../repositories/users.repository";

async function getUser(userId){
    return await usersRepository.getUser(userId)
}
async function getUsers() {
    return await usersRepository.getUsers()
}
async function createUser(newUser) {
 return await usersRepository.createUser(newUser) 
}

export default {
    getUser,
    getUsers,
    createUser
}