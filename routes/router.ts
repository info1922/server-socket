import { Router, Request, Response } from "express";

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

    resp.status(200).json({
        ok: true,
        cuerpo,
        de,
        id
    });
});