import { ResponseApi } from "../../../../src/app/interfaces/response-api.interface";
import { ResponseLogin } from "../../../../src/app/interfaces/response-login.interface";

export const RESPONSE_VALID_ACTIVE_USER_JSON: ResponseApi<null> =
{
    "success": true,
    "message": "Token verificado com sucesso",
    "data": []
};

export const RESPONSE_INVALID_ACTIVE_USER_JSON: ResponseApi<null> =
{
    "data": [],
    "message": "Token inválido",
    "success": false
};

export const RESPONSE_VALID_RECOVERY_ACCOUNT_JSON: ResponseApi<null> =
{
    "success": true,
    "message": "Verifique seu e-mail!",
    "data": []
};

export const RESPONSE_INVALID_RECOVERY_ACCOUNT_JSON: string =
    `{
    "success": false,
    "message": "Usuário nao encontrado",
    "data": []
}`;

export const RESPONSE_INVALID_LOGIN_JSON: ResponseApi<null> = {

    "message": "Email ou senha incorretos",
    "success": false,
    "data": []
};

export const RESPONSE_VALID_LOGIN_JSON: string =
    `{
    "message": "Login realizado com sucesso",
    "status": true
}`;

export const RESPONSE_INVALID_FIND_USER_JSON: boolean =
    false;

export const RESPONSE_VALID_FIND_USER_JSON: string =
    `{
    "success": true,
    "message": "Usuário encontrado com sucesso",
    "data": [
        {
            "empty": false,
            "id": "361c071c-8a3e-4a49-ac0d-8195b22920b2",
            "email": "entrega@ativobyte.com.br",
            "firstName": "Julia",
            "lastName": "Santos",
            "cnpjCpfRg": "45612378900",
            "userName": "koszudikas",
            "legalRegister": "",
            "roles": []
        }
    ]
}`;

export const RESPONSE_INVALID_LOGOUT_JSON: boolean =
    false;

export const RESPONSE_VALID_LOGOUT_JSON: string =
    `{
    "message": "Logout ",
    "status": true
}`;

export const RESPONSE_INVALID_VERIFY_TOKEN_JSON: boolean =
    false;

export const RESPONSE_VALID_VERIFY_TOKEN_JSON: boolean =
    true;