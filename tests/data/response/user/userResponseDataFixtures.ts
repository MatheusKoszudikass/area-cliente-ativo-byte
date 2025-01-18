import { ResponseApi } from "../../../../src/app/interfaces/response-api.interface";

export const RESPONSE_VALID_ADD_USER_JSON: ResponseApi<null> = {
    success: true,
    message: "Usuário criado com sucesso. Verifique sua caixa de email para ativação da conta.",
    data: []
};

export const REPONSE_INVALID_ADD_USER_JSON: ResponseApi<null> = {
    success: false,
    message: "Usuário já existe",
    data: []
}

export const RESPONSE_VALID_FIND_USER_TOKEN_SESSION_JSON: ResponseApi<null> = {
    success: false,
    message: "Usuário nao encontrado",
    data: []
}