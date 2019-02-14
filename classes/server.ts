import express from 'express';
import { SERVER_PORT } from '../global/environment';
import sockeIO from 'socket.io';
import http from 'http';
import * as mysocket from '../sockets/sockets';

export default class Server {
    private static _instance: Server;
    public app: express.Application;
    public port: number;

    public io: sockeIO.Server;
    private httpServer: http.Server;

    private constructor() {
        //Inicializar app
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = sockeIO(this.httpServer);

        this.eschuarSockets();

    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    private eschuarSockets() {
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente => {
            console.log('Cliente conectado');

            // Socket pendiente de los mensajes
            mysocket.mensaje(cliente, this.io);
            // Desconectar un cliente
            mysocket.desconectar(cliente);


        });
    }

    // Funcion para levantar el servidor
    start( callback: Function) {
        this.httpServer.listen(this.port, callback);
    }
}