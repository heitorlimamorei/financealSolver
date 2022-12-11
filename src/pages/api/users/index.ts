import type { NextApiRequest, NextApiResponse } from "next";
import userService from "../../../backEnd/services/user.service";
export default async function userController(req:NextApiRequest, res:NextApiResponse){
    if(req.method === 'GET'){
        res.status(200).json(await userService.getUsers())
    } else if(req.method === 'POST'){
        const newUser = req.body
        if(newUser.username, newUser.email, newUser.password){
            res.status(200).json(await userService.createUser(newUser))
        } else {
            throw new Error('Erro: 400, body mal formatado!')
        }
    }
}