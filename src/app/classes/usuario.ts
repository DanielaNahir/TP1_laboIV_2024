export class Usuario {
    nombre: string
    apellido: string
    email: string
    clave: string
    tipoUsuario: ETipoUsuario

    constructor(nombre:string, apellido:string, email:string, clave:string,
        tipoUsuario:ETipoUsuario){
        this.nombre = nombre,
        this.apellido = apellido,
        this.email = email,
        this.clave = clave,
        this.tipoUsuario = tipoUsuario
    }
}
