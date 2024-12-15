import { CreateRoleInterface } from "./create-role.interface";

export interface CreateUserInterface {
    email: string;
    roles: Array<CreateRoleInterface>[];
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    cpfcnpj: string;
    number: string;
    legalPerson: boolean;
    
}