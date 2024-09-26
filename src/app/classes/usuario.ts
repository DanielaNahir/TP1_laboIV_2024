export class Usuario {
    nombre: string
    apellido: string
    email: string
    clave: string
    tipoUsuario: string
    constructor();
    constructor(nombre:string, apellido:string, email:string, clave:string);
    constructor(nombre?:string, apellido?:string, email?:string, clave?:string){
        this.nombre = nombre ?? "",
        this.apellido = apellido ?? "",
        this.email = email ?? "",
        this.clave = clave ?? "",
        this.tipoUsuario = "guest"
    }
}
