import { Request, Response } from 'express';
import { User } from '../models/User';

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const list = async (req: Request, res: Response) => {
    let users = await User.findAll();
    let list: string[] = [];

    for(let i in users) {
        list.push( users[i].email );
    }

    res.json({ list });
}