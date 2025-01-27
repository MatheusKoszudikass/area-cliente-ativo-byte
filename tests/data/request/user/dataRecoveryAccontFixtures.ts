import { RecoveryAccountInterface } from "../../../../src/app/interfaces/recovery-account-interface";

export const REQUEST_VALID_RECOVERY_ACCOUNT_JSON: RecoveryAccountInterface = {
    token: 'token',
    password: 'password'
};

export const REQUEST_INVALID_RECOVERY_ACCCOUNT_JSON: RecoveryAccountInterface = {
    token: '',
    password: ''
};