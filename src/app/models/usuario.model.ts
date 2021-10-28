export class Usuario {
    constructor(
        public username: string,
        public email: string,
        public first_name?:string,
        public last_name?:string,
        public pk?:number,
        public is_superuser?: boolean,
        public is_active?: boolean,
    ){}
}