import { Response } from "express";

export function setCookie(res: Response, name: string,token: string) {
    res.cookie(name,token,{
        maxAge: 1000*60*60,
        httpOnly: true
    })
}