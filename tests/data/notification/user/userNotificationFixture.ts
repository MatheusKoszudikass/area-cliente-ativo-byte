import { RESPONSE_INVALID_ADD_USER_JSON, RESPONSE_INVALID_RECOVERY_ACCOUNT_JSON, RESPONSE_VALID_ADD_USER_JSON, RESPONSE_VALID_RECOVERY_ACCOUNT_JSON } from "../../response/user/userResponseDataFixtures";

export const  NOTIFICATION_INVALID_OBJECT_ADD_USER_JSON = {
    type: 'warning',
    title: 'Usuário!',
    message: 'Preencha todos os campos'
};

export const  NOTIFICATION_VALID_ADD_USER_JSON = {
    type: 'success',
    title: 'Usuário!',
    message: RESPONSE_VALID_ADD_USER_JSON.message
};

export const  NOTIFICATION_INVALID_ADD_USER_JSON = {
    type: 'warning',
    title: 'Usuário!',
    message: RESPONSE_INVALID_ADD_USER_JSON.message
};

export const NOTIFICATION_VALID_RECOVERY_ACCOUNT_JSON = {
  type: 'success',
  title: 'Usuário!',
  message: RESPONSE_VALID_RECOVERY_ACCOUNT_JSON.message
};

export const NOTIFICATION_INVALID_RECOVERY_ACCOUNT_JSON = {
  type: 'warning',
  title: 'Usuário!',
  message: RESPONSE_INVALID_RECOVERY_ACCOUNT_JSON.message
};
