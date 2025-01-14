import { RESPONSE_INVALID_ACTIVE_USER_JSON, RESPONSE_INVALID_LOGIN_JSON, RESPONSE_VALID_ACTIVE_USER_JSON } from "../../response/auth/authResponseDataFixtures";

export const NOTIFICATION_VALID_ACTIVE_USER_JSON = {
  type: 'success',
  title: 'Usuário!',
  message: RESPONSE_VALID_ACTIVE_USER_JSON.message
};

export const NOTIFICATION_INVALID_ACTIVE_USER_JSON = {
  type: 'warning',
  title: 'Usuário!',
  message: RESPONSE_INVALID_ACTIVE_USER_JSON.message
};


export const NOTIFICATION_EMAIL_EMPTY_RECOVERY_JSON = {
  type: 'warning',
  title: 'Usuário!',
  message: 'Insira um email'
};

export const NOTIFICATION_VALID_RECOVERY_JSON = {
  type: 'success',
  title: 'Login bem-sucedido!',
  message: 'Login efetuado com sucesso!'
};

export const NOTIFICATION_INVALID_RECOVERY_JSON = {
  type: 'success',
  title: 'Recuperação bem-sucedida',
  message: 'Verifique seu email para redefinir sua senha'
};

export const NOTIFICATION_INVALID_LOGIN_JSON = {
  type: 'error',
  title: 'Não foi possível efetuar o login',
  message: RESPONSE_INVALID_LOGIN_JSON.message
};