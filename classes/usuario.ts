export class Usuario {

    // Id del socket que se esta conectando - obligatorio
    public id: string;
    // Nombre de la persona - opcional
    public nombre: string;
    // Sala de chat - opcional
    public sala: string;

    constructor(id: string) {
        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala = 'sin-sala';
    }
}