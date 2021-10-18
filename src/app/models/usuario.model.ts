export class Usuario {
    constructor(
        public username: string,
        public email: string,
        public first_name?:string,
        public last_name?:string,
        public id?:number
    ){}
}