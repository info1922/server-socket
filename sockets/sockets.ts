// Logica de los sockets
import { Socket } from 'socket.io';
import sockeIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();


export const conectarCliente = (cliente: Socket, io: sockeIO.Server) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

// Desconectar cliente
export const desconectar = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('disconnect', () => {
        usuariosConectados.borrarUsuario(cliente.id);
        console.log('Cliente desconectado');
        io.emit('usuarios-activos', usuariosConectados.getLista());
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

/* Escucha el nombre emitido por el cliente*/
export const nombre = (cliente: Socket, io: sockeIO.Server) => {
    /* Escuchando mensaje */
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {
        

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', usuariosConectados.getLista()); 

        callback({
            ok: true,
            mensaje: `El usuario ${payload.nombre}, configurado`
        });

    });
}

/* Obtener usuarios */
export const obtenerUsuarios = (cliente: Socket, io: sockeIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista())
    });
}
