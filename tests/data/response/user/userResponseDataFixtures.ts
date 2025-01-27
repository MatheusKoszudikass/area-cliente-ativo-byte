import { ResponseApi } from "../../../../src/app/interfaces/response-api.interface";
import { ResponseUserInterface } from "../../../../src/app/interfaces/response-user.interface";

export const RESPONSE_INVALID_ADD_USER_JSON: ResponseApi<null> = {
    success: false,
    message: "Usuário já existe",
    data: []
}

export const RESPONSE_VALID_ADD_USER_JSON: ResponseApi<null> = {
    success: true,
    message: "Usuário criado com sucesso. Verifique sua caixa de email para ativação da conta.",
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

export const RESPONSE_INVALID_EXIST_USER_JSON: ResponseApi<null> = {
    success: true,
    message: "Usuário já existe",
    data: []
};

export const RESPONSE_VALID_EXIST_USER_JSON: ResponseApi<null> = {
    success: false,
    message: "Usuário não encontrado",
    data: []
};

export const RESPONSE_INVALID_VERIFY_TOKEN_RECOVERY_ACCOUNT_JSON: boolean = false;

export const RESPONSE_VALID_VERIFY_TOKEN_RECOVERY_ACCOUNT_JSON: boolean = true;

export const RESPONSE_INVALID_RECOVERY_ACCOUNT_JSON: ResponseApi<any> = {
    success: false,
    message: "Token inválido.",
    data: []
};

export const RESPONSE_VALID_RECOVERY_ACCOUNT_JSON: ResponseApi<any> = {
    success: true,
    message: "Senha redefinida com sucesso.",
    data: []
};


