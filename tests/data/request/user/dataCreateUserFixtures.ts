import { CreateUserInterface } from '../../../../src/app/interfaces/create-user-interface';


export const REQUEST_VALID_CREATE_USER_JSON: CreateUserInterface = {
    email: "H4H6o@example.com",
    password: "12345678",
    firstName: "Teste",
    lastName: "Teste",
    cnpjCpfRg: "12345678901",
    legalRegister: true,
    userName: "teste",
    roles: [],
    token: ''
};

export const REQUEST_INVALID_CREATE_USER_JSON: CreateUserInterface = {
    email: "H4H6o@example.com",
    password: "12345678",
    firstName: "Teste",
    lastName: "Teste",
    cnpjCpfRg: "12345678901",
    legalRegister: true,
    userName: "teste",
    roles: [],
    token: ''
};

export const REQUEST_CREATE_USER_JSON: CreateUserInterface = {
    email: "",
    password: "12345678",
    firstName: "Teste",
    lastName: "Teste",
    cnpjCpfRg: "12345678901",
    legalRegister: true,
    userName: "teste",
    roles: [],
    token: ''
};

