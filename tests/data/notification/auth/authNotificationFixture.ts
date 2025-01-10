import { RESPONSE_INVALID_ACTIVE_USER_JSON, RESPONSE_INVALID_LOGIN_JSON } from "../../response/auth/authResponseDataFixtures";

export const NOTIFICATION_VALID_ACTIVE_USER_JSON: [string, string, string] = [
    'success',
    'Usuário!',
    RESPONSE_INVALID_ACTIVE_USER_JSON.message
];

export const NOTIFICATION_INVALID_ACTIVE_USER_JSON: [string, string, string] = [
    'warning',
    'Usuário!',
    RESPONSE_INVALID_ACTIVE_USER_JSON.message
];

export const NOTIFICATION_NULL_RECOVERY_JSON: [string, string, string] = [
    'warning',
    'Usuário!',
    'Insira um email'
];

export const NOTIFICATION_VALID_INVALID_RECOVERY_JSON: [string, string, string] = [
    'success',
    'Recuperação bem-sucedida',
    'Verifique seu email para redefinir sua senha'
];

export const NOTIFICATION_VALID_LOGIN_JSON: [string, string, string] = [
    'success',
    'Login bem-sucedido!',
    `Login efetuado com sucesso!`
];

export const NOTIFICATION_INVALID_LOGIN_JSON: [string, string, string] = [
    'error',
    'Não foi possível efetuar o login',
    RESPONSE_INVALID_LOGIN_JSON.message
]