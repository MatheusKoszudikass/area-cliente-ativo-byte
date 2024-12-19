import { CreateRoleInterface } from "./create-role.interface";

export interface CreateUserInterface {
    email: string| null | undefined;
    password: string| null | undefined;
    firstName: string| null | undefined;
    lastName: string| null | undefined;
    cnpjCpfRg: string| null | undefined;
    legalRegister: boolean| null | undefined;
    userName: string| null | undefined;
    roles: Array<CreateRoleInterface>[] | null | undefined;
    token: string| null | undefined;
    
}