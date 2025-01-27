import { CreateLogin } from "../../../../src/app/interfaces/create-login.interface";

export const REQUEST_CREATE_LOGIN_VALID_JSON:  CreateLogin = {
    emailUserName: "H4H6o@example.com",
    password: "12345678",
    remember: true
}

export const REQUEST_CREATE_LOGIN_INVALID_JSON: CreateLogin = {
    emailUserName: "H4H6o@example.com",
    password: "12345678",
    remember: true
}

export const REQUEST_CREATE_LOGIN_JSON: CreateLogin = {
    emailUserName: '',
    password: '',
    remember: false
}