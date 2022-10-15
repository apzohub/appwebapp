export const TKN = 'tkn';

export class User{
    id!: string;
    email!: string;
    password!: string;
    status!:string; //CREATED | ACTIVE | INACTIVE | DELETED
}