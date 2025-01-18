import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { environment } from '../../../environments/environment';
import { ResponseApi } from '../../interfaces/response-api.interface';
import { CreateUserInterface } from '../../interfaces/create-user-interface';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { RecoveryAccountInterface } from '../../interfaces/recovery-account-interface';
import { ResponseUserInterface } from '../../interfaces/response-user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.apiLogin;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  }
  constructor(private router: Router, private http: HttpClient,
    private notification: NzNotificationService
  ) { }

  public async add(user: CreateUserInterface): Promise<void> {

    const propertiesToVerify: (keyof CreateUserInterface)[] = [ 
      'email', 'password', 'firstName', 'lastName', 'cnpjCpfRg', 'legalRegister', 'userName'];
      
    if(this.verifyObjectProperties(user, propertiesToVerify)){ 
      this.notificationInvalidUser();
      return;
    }
    
    try {

      const response = await lastValueFrom(this.http.post<ResponseApi<null>>(
        `${this.apiUrl}/api/user/add`, user, this.httpOptions));
        
      this.notificationOfUserRegistration(response);

    } catch (error) {
      
      this.notification.create('error', 'API', 'Desculpe,' +
        ' ocorreu um erro ao processar sua solicitação. Por favor, ' +
        'tente novamente mais tarde ou contate nosso suporte para obter ajuda.');
    }
  }
  
   /**
   * Finds the logged-in user by sending a GET request to the server.
   *
   * @returns A promise that resolves to the user object if the request is successful.
   *          Returns null if the request fails or if the user is not logged in.
   */
   public async findUserTokenSession(): Promise<ResponseApi<ResponseUserInterface> | null> {

    try {

      const response = await lastValueFrom(this.http.get<ResponseApi<ResponseUserInterface>>(`${this.apiUrl}/api/auth/findUser`,
        this.httpOptions));

      if (response.success === false) this.router.navigate(['/login']);

      return response;

    } catch (error) {
      this.notification.create('error', 'API', 'Desculpe,' +
        ' ocorreu um erro ao processar sua solicitação. Por favor, ' +
        'tente novamente mais tarde ou contate nosso suporte para obter ajuda.');

      return null;
    }
  }
  
/**
 * Displays a warning notification indicating that all user fields must be filled in.
 */

  private notificationInvalidUser(): void {
    this.notification.create(
      'warning', 
      'Usuário!', 
      'Preencha todos os campos'
    );
  }

  /**
   * Displays a notification based on the response status of the user registration.
   * If the response status is true, a success notification is displayed with the response message.
   * If the response status is false, a warning notification is displayed with the response message.
   * Navigates the user to the login page if the response status is true.
   * @param response - The response object containing the status and message from the API.
   */
  private notificationOfUserRegistration(response: ResponseApi<null>): void {

    if (response.success === true) {
      this.notification.create(
        'success',
        'Usuário!',
        response.message,
      );
      this.router.navigate(['/login']);
      return;
    }
    this.notification.create(
      'warning',
       'Usuário!', 
       response.message);
  }


  /**
   * Checks if a user exists by sending a POST request to the server.
   * 
   * @param identifier - The identifier of the user to check.
   * @returns A promise that resolves to true if the user exists, false otherwise.
   *          Returns false if the request fails or if the user is not logged in.
   */
  public async Exist(identifier: string | null | undefined): Promise<boolean> {
    try {
      
      const response = await lastValueFrom(this.http.post<ResponseApi<null>>(
        `${ this.apiUrl }/api/user/exist`, { identifier }, this.httpOptions));
        
      return response.success;

    } catch (error) {
      this.notification.create('error', 'API', 'Desculpe,' +
        ' ocorreu um erro ao processar sua solicitação. Por favor, ' +
        'tente novamente mais tarde ou contate nosso suporte para obter ajuda.');

      return false
    }
  }

  /**
   * Checks if a user password matches the current password by sending a POST request to the server.
   * 
   * @param recovery - The recovery object containing the current password and the new password.
   * @returns A promise that resolves to true if the password matches, false otherwise.
   *          Returns false if the request fails or if the user is not logged in.
   */
  public async recoveryAccount(recovery: RecoveryAccountInterface): Promise<boolean> {
    try {

      const response = await lastValueFrom(
        this.http.post<ResponseApi<any>>(`${ this.apiUrl } / api / user / confirmPasswordReset`,
          recovery, this.httpOptions));

      this.notificationOfUserRecovery(response);

      if(response.success === true) return true;

      return false;

    } catch (error) {
      this.notification.create('error', 'API', 'Desculpe,' +
        ' ocorreu um erro ao processar sua solicitação. Por favor, ' +
        'tente novamente mais tarde ou contate nosso suporte para obter ajuda.');
        return false;
    }
  }

/**
 * Displays a notification based on the success of the user account recovery process.
 * If the recovery process is successful, a success notification is displayed and the user is redirected to the login page.
 * If the recovery process fails, a warning notification is displayed with the response message.
 * 
 * @param response - The response from the password reset confirmation endpoint.
 */

  private notificationOfUserRecovery(response: ResponseApi<any>): void {

    if (response.success == true) {
      this.notification.create(
        'success',
        'Usuário!',
        response.message,
      );
      this.router.navigate(['/login']);
      return;
    }
    this.notification.create('warning', 'Usuário!', response.message);
  }


  /**
   * Checks if a document (CPF or CNPJ) is valid.
   * 
   * @param documentType - The type of document to validate, either 'CPF' or 'CNPJ'.
   * @param document - The document number to validate.
   * @returns True if the document is valid, false otherwise.
   */
  public validationDocument(documentType: string | null | undefined,
    document: string | null | undefined): boolean {
    if (!document || document.trim().length === 0) return false

    if (documentType === 'CPF') {
      return this.validationCpf(document);
    }
    return this.validationCnpj(document);
  }

  /**
   * Checks if a CPF (Brazilian national ID) is valid.
   * 
   * @param cpf - The CPF number to validate.
   * @returns True if the CPF is valid, false otherwise.
   *          Displays an error notification if the CPF is invalid.
   */
  private validationCpf(cpf: string | null | undefined): boolean {

    if (cpf?.length !== 11 || /^d(\d)\1{13}$/.test(cpf)) {
      this.notification.create('error', 'Documento', 'CPF precisa de 11 dígitos');
      return false
    }
    if (this.calculationValidationCPf(cpf)) {
      return true
    }
    this.notification.create('error', 'Documento', 'CPF Inválido ');
    return false
  }

  /**
   * Checks if a CPF is valid by calculating the digits of the CPF using the modulo 11 algorithm.
   * 
   * @param cpf - The CPF number to validate.
   * @returns True if the CPF is valid, false otherwise.
   */
  private calculationValidationCPf(cpf: string): boolean {
    const calc = (x: number): number => {
      const total = cpf
        .substring(0, x)
        .split('')
        .reduce((sum, num, index) => sum + parseInt(num) * (x + 1 - index), 0);
      const resto = total % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    return calc(9) === parseInt(cpf[9]) && calc(10) === parseInt(cpf[10]);
  }

  private validationCnpj(cnpj: string | null | undefined): boolean {

    if (cnpj?.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
      this.notification.create('error', 'Documento', 'CNPJ precisa de 14 dígitos');
      return false
    }

    if (this.calculationValidationCnpj(cnpj)) {

      return true
    }

    this.notification.create('error', 'Documento', 'CNPJ Inválido ');
    return false
  }

  private calculationValidationCnpj(cnpj: string): boolean {
    const calc = (x: number): number => {
      const c = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      const total = cnpj
        .substring(0, x)
        .split('')
        .reduce((sum, num, index) => sum + parseInt(num) * c[13 - x + index], 0);
      const resto = total % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    return calc(12) === parseInt(cnpj[12]) && calc(13) === parseInt(cnpj[13]);
  }

  private verifyObjectProperties<T>(object: T, properties: (keyof T)[]): boolean {
    for(const property of properties) {
      if(object[property] === null || object[property] === undefined 
        || object[property] === '' ) {
        return true;
      }
    }
    return  false;
  }
}
