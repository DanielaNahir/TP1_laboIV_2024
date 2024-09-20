export class Usuario {
    nombre: string
    apellido: string
    email: string
    clave: string
    tipoUsuario: string
    estado: boolean = true;

    constructor(nombre:string, apellido:string, email:string, clave:string,
        tipoUsuario:string){
        this.nombre = nombre,
        this.apellido = apellido,
        this.email = email,
        this.clave = clave,
        this.tipoUsuario = tipoUsuario
    }
}
