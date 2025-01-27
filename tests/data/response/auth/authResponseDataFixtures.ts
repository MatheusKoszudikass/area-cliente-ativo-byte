import { ResponseApi } from "../../../../src/app/interfaces/response-api.interface";
import { ResponseUserInterface } from "../../../../src/app/interfaces/response-user.interface";

export const RESPONSE_VALID_ACTIVE_USER_JSON: ResponseApi<null> =
{
    success: true,
    message: "Token verificado com sucesso",
    data: []
};

export const RESPONSE_INVALID_ACTIVE_USER_JSON: ResponseApi<null> =
{
    success: false,
    message: "Token inválido",
    data: []
};

export const RESPONSE_VALID_AUTH_RECOVERY_ACCOUNT_JSON: ResponseApi<null> =
{
    success: true,
    message: "Usuário já existe",
    data: []
};

export const RESPONSE_INVALID_AUTH_RECOVERY_ACCOUNT_JSON: ResponseApi<null> =
{
    success: false,
    message: "Usuário nao encontrado",
    data: []
};

export const RESPONSE_INVALID_LOGIN_JSON: ResponseApi<null> = 
{
    success: false,
    message: "Email ou senha incorretos",
    data: []
};

export const RESPONSE_VALID_LOGIN_JSON: ResponseApi<null> =
{
    success: true,
    message: "Login realizado com sucesso",
    data: []
};

export const RESPONSE_INVALID_FIND_USER_JSON: ResponseApi<ResponseUserInterface> = 
{
    success: false,
    message: "Usuário nao encontrado",
    data: []
};

export const RESPONSE_VALID_FIND_USER_JSON: ResponseApi<ResponseUserInterface> =
{
    success: true,
    message: "Usuário encontrado com sucesso",
    data: [
        {
            id: "361c071c-8a3e-4a49-ac0d-8195b22920b2",
            email: "entrega@ativobyte.com.br",
            firstName: "Julia",
            lastName: "Santos",
            cnpjCpfRg: "45612378900",
            userName: "koszudikas",
            legalRegister: true,
            roles: []
        }
    ]
};

export const RESPONSE_INVALID_CHECK_USER_SESSION_TOKEN_JSON: boolean = false;

export const RESPONSE_VALID_CHECK_USER_SESSION_TOKEN_JSON: boolean = true;

export const RESPONSE_INVALID_LOGOUT_JSON: boolean = false;

export const RESPONSE_VALID_LOGOUT_JSON: boolean = true;