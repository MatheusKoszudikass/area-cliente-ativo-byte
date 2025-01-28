import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { environment } from '../../../environments/environment';
import { ResponseApi } from '../../interfaces/response-api.interface';
import { CreateUserInterface } from '../../interfaces/create-user-interface';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { RecoveryAccountInterface } from '../../interfaces/recovery-account-interface';
import { ResponseUserInterface } from '../../interfaces/response-user.interface';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authService = inject(AuthService);
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

  public async add(user: CreateUserInterface): Promise<boolean> {

    const propertiesToVerify: (keyof CreateUserInterface)[] = [
      'email', 'password', 'firstName', 'lastName', 'cnpjCpfRg', 'legalRegister', 'userName'];

    if (this.verifyObjectProperties(user, propertiesToVerify)) {
      this.notificationInvalidUser();
      return false;
    }

    try {

      const response = await lastValueFrom(this.http.post<ResponseApi<null>>(
        `${this.apiUrl}/api/user/add`, user, this.httpOptions));

      this.notificationOfUserRegistration(response);
      return response.success;
    } catch (error) {

      this.notification.create('error', 'API', 'Desculpe,' +
        ' ocorreu um erro ao processar sua solicitação. Por favor, ' +
        'tente novamente mais tarde ou contate nosso suporte para obter ajuda.');

      return false
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
  * Finds the logged-in user by sending a GET request to the server.
  *
  * @returns A promise that resolves to the user object if the request is successful.
  *          Returns null if the request fails or if the user is not logged in.
  */
  public async findUserTokenSession(): Promise<ResponseApi<ResponseUserInterface> | null> {

    try {

      const response = await lastValueFrom(this.http.get<ResponseApi<ResponseUserInterface>>(
        `${this.apiUrl}/api/user/findUserSession`,
        this.httpOptions));

      if (response.success === false) {
        this.authService.logout();
      }

      return response;

    } catch (error) {
      this.notification.create('error', 'API', 'Desculpe,' +
        ' ocorreu um erro ao processar sua solicitação. Por favor, ' +
        'tente novamente mais tarde ou contate nosso suporte para obter ajuda.');

      return null;
    }
  }

  /**
   * Checks if a user exists by sending a POST request to the server.
   * 
   * @param identifier - The identifier of the user to check.
   * @returns A promise that resolves to true if the user exists, false otherwise.
   *          Returns false if the request fails or if the user is not logged in.
   */
  public async existUser(identifier: string | null | undefined): Promise<boolean> {
    try {

      const response = await lastValueFrom(this.http.post<ResponseApi<null>>(
        `${this.apiUrl}/api/user/exist`, { identifier }, this.httpOptions));

      return response.success;

    } catch (error) {
      this.notification.create('error', 'API', 'Desculpe,' +
        ' ocorreu um erro ao processar sua solicitação. Por favor, ' +
        'tente novamente mais tarde ou contate nosso suporte para obter ajuda.');

      return false
    }
  }

  /**
   * Verifies if a user token for password recovery is valid by sending a GET request to the server.
   * If the token is invalid, the user is redirected to the login page.
   *
   * @param token - The token used to verify the password recovery.
   * @returns A promise that resolves when the verification process is complete.
   *          Returns null if the request fails or if the user is not logged in.
   */
  public async verifyTokenRecoveryAccount(token: string | null): Promise<boolean>
  {
    try
    {
      const response = await lastValueFrom(this.http.get<boolean>(
        `${this.apiUrl}/api/user/verifyTokenRecoveryAccount?token=${token}`, this.httpOptions));
        
        return response;

    }catch(error) {
      this.notification.create('error', 'API', 'Desculpe,' +
        ' ocorreu um erro ao processar sua solicitação. Por favor, ' +
        'tente novamente mais tarde ou contate nosso suporte para obter ajuda.');
        return false;
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
        this.http.post<ResponseApi<any>>(`${this.apiUrl}/api/user/confirmPasswordReset`,
          recovery, this.httpOptions));

      this.notificationOfUserRecovery(response);

      if (response.success === true) return true;

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

  private verifyObjectProperties<T>(object: T, properties: (keyof T)[]): boolean {
    for (const property of properties) {
      if (object[property] === null || object[property] === undefined
        || object[property] === '') {
        return true;
      }
    }
    return false;
  }
}
