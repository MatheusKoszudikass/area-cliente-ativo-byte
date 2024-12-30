import { ResponseRoleInterface } from "./response-role.interface"

export interface ResponseUserInterface {
    id: string 
    email: string
    firstName: string
    lastName: string
    cnpjCpfRg: string
    legalRegister: boolean
    userName: string
    roles: Array<ResponseRoleInterface| null | undefined>
}