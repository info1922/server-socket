import { Router, Request, Response } from "express";
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from "../sockets/sockets";

// Ayuda a crear los endpoint
export const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo bien'
    });
});

router.post('/mensajes', (req: Request, resp: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

     /* Enviar mensaje global */
    server.io.emit('mensaje-nuevo', payload);

    resp.status(200).json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req: Request, resp: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    /* Enviar mensaje privado */
    server.io.in(id).emit('mensaje-privado', payload);

    /* Enviar mensaje global */
   /*  server.io.emit('mensaje-privado', payload); */
   

    resp.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

/* Servicio para obtener todos los id de los usuarios */
router.get('/usuarios', (req: Request, res: Response) => {
    const server = Server.instance;

    //Barrer todos los clientes
    server.io.clients((err: any, clientes: string[]) => {
        if (err) {
            return res.json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            clientes
        });

    });
});

/* Obtener usuario y sus nombres */
router.get('/usuarios/detalle', (req: Request, res: Response ) => {
    
    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    })

});