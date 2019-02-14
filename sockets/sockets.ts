// Logica de los sockets
import { Socket } from 'socket.io';
import sockeIO from 'socket.io';


// Desconectar cliente
export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
}

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: sockeIO.Server) => {
    // Escuchando mensaje
    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) => {
        console.log('Mensaje Recibido', payload);

        // Emitir mensaje a todos los usuarios conectados
        io.emit('mensaje-nuevo', payload);
    });
}