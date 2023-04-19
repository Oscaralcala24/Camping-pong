export class User {
    nombre: string;
    apellidos: string;
    dni: string;
    nickname: string;
    email: string;
    telefono: number;
    role: string;
    
    public constructor(nombre: string, apellidos:string,dni:string, nickname:string, email:string,telefono:number,role:string) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.dni = dni;
        this.nickname = nickname;
        this.email = email;
        this.telefono = telefono;
        this.role = role;
      }


      public getNickname(): string {
        return this.nickname;
      }
}