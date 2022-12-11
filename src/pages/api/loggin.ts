import type { NextApiRequest, NextApiResponse } from "next";
import logginService from '../../backEnd/services/login.service'
export default async function logginController(req:NextApiRequest, res:NextApiResponse){
    if(req.method === 'POST'){
        const user = req.body
        if(user.email, user.password){
            res.status(200).json(await logginService(user))
        } else {
            res.status(405)
        }
    }
}