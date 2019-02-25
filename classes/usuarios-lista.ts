import { Usuario } from './usuario';

export class UsuariosLista {
    private lista: Usuario[] = [];

    constructor() {

    }

    /* Agregar un usuario */
    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    /* Actualiza el nombre de un usuario */
    public actualizarNombre(id: string, nombre: string) {
        for (const usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('********* Usaurio actualizado ***********');
        console.log(this.lista);
    }

    /* Obtener la lista de usuarios */
    public getLista() {
        return this.lista;
    }

    /* Obtener un usuario en particular */
    public getUsuario(id: string) {
        return this.lista.find( usuario => usuario.id === id );
    }

    /* Obtener un usuario de una sala en particular */
    public getUsuarioEnSala(sala: string) {
        return this.lista.filter( usuario => usuario.sala === sala);
    }

    /* Borrar un usuario */
    public borrarUsuario(id: string) {
        const tempUser = this.getUsuario(id);

        this.lista = this.lista.filter( usuario => usuario.id !== id)
        console.log(this.lista);
        
        return tempUser;
    }


}
