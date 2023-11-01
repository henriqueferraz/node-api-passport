import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api';

dotenv.config();

const server = express();

server.use(cors());
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));
server.use(apiRoutes);
server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'PÁGINA NÃO ENCONTRADA.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ error: 'ERRO - CONTATE O SUPORTE' });
}
server.use(errorHandler);

server.listen(process.env.PORT);