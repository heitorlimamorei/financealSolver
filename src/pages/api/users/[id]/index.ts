import type { NextApiRequest, NextApiResponse } from "next";
import userService from "../../../../backEnd/services/user.service";
export default async function userController(req:NextApiRequest, res:NextApiResponse){
    if(req.method === 'GET'){
        res.status(200).json(await userService.getUser(req.query.id))
    }
}