import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ResponseApi } from '../../interfaces/response-api.interface';
import { ResponseLogin } from '../../interfaces/response-login.interface';
import { CreateLogin } from '../../interfaces/create-login.interface';
import { environment } from '../../../environments/environment';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  apiUrl: string = environment.apiLogin;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  };

  constructor(private router: Router, private http: HttpClient,
    private notification: NzNotificationService) { }

  /**
   * Activates a user account using the provided token.
   * Sends a POST request to the API endpoint '/api/user/active-user' with the token as a query parameter.
   * Verifies the activation response and returns it.
   * 
   * @param token - The token used to activate the user account.
   * @returns A promise that resolves to the API response containing the activation status and message.
   */

  public async activeUser(token: string): Promise<void> {

    try{

      const params = new HttpParams().set('token', token);

      const httpOptionsParams = {
        ...this.httpOptions,
        params
      }
  
      const response = await lastValueFrom(this.http.post<ResponseApi>(`${this.apiUrl}/api/user/twoFactorAuth`,
        null, httpOptionsParams));
  
      this.verifyActiveUser(response);
    }catch(error){
       this.notification.create('error', 'API', 'Desculpe,' +
        ' ocorreu um erro ao processar sua solicitação. Por favor, ' + 
        'tente novamente mais tarde ou contate nosso suporte para obter ajuda.');
    }
  }

  /**
   * Displays a notification based on the response status of the active user verification.
   * If the response status is true, a success notification is displayed with the response message.
   * If the response status is false, a warning notification is displayed with the response message.
   * @param response - The response object containing the status and message from the API.
   */
  private verifyActiveUser(response: ResponseApi): void {
    if (response.success == true) {
      this.notification.create(
        'success',
        'Usuário!',
        response.message,
      )
    } else {
      this.notification.create(
        'warning',
        'Usuário!',
        response.message
      );
    }
  }

  /**
   * Initiates the account recovery process for a user.
   * Sends a POST request to the '/api/auth/recovery-account' endpoint with the provided login details.
   * Displays a notification based on the success of the recovery process.
   * 
   * @param createLogin - An object containing the login details required for account recovery.
   * @returns A promise that resolves when the recovery process is complete.
   */

  public async recoveryAccount(createLogin: CreateLogin): Promise<ResponseApi | null> {
     if(createLogin.email_userName == null || createLogin.email_userName == '') 
     {
      this.notification.create(
        'warning',
        'Usuário!',
        'Insira um email',
      ); 
      return null;
     }

     try{

      const response = await lastValueFrom(this.http.post<ResponseApi>(`${this.apiUrl}/api/auth/recovery-account`,
        createLogin, this.httpOptions))
  
      this.verifyRecoveryAccount(response);

      return response;

     }catch(erro)
     {
      this.notification.create('error', 'API', 'Desculpe,' +
        ' ocorreu um erro ao processar sua solicitação. Por favor, ' + 
        'tente novamente mais tarde ou contate nosso suporte para obter ajuda.');
        return null;
     }
  }

  /**
   * Verifies the success of the account recovery process and displays a notification based on the result.
   * If the recovery process was successful, a success notification is displayed with instructions to check the email for a password reset link.
   * @param response - The response from the recovery account endpoint.
   */
  private verifyRecoveryAccount(response: ResponseApi): void {
    if (response != null)
      this.notification.create(
        'success',
        'Recuperação bem-sucedida',
        'Verifique seu email para redefinir sua senha',
      )
  }

  /**
   * Authenticates the user by sending a login request to the server.
   * 
   * @param loginData - The login credentials, including email/username and password.
   * @returns A promise that resolves to a ResponseLogin object containing the status and message of the login attempt.
   * @throws An error if the HTTP request fails.
   */

  public async login(loginData: CreateLogin): Promise<ResponseLogin> {

    const response = await lastValueFrom(this.http.post<ResponseLogin>(`${this.apiUrl}/api/login`,
        loginData, this.httpOptions));
  
      this.verifyLogin(response);

      return response;
  }

  /**
   * Verifies the login response and shows a notification accordingly.
   * If the login was successful, navigates to the welcome page.
   * @param response - The response from the server.
   */

  private verifyLogin(response: ResponseLogin) {
    if (response.status) {
      this.notification.create(
        'success',
        'Login bem-sucedido!',
        `Login efetuado com sucesso!`
      );
      this.router.navigate(['/welcome']);
    } else {
      this.notification.create(
        'error',
        'Não foi possível efetuar o login',
        response.message
      );
    }
  }

  /**
   * Checks if the user's authentication token is still valid by sending a verification request to the server.
   *
   * @returns A promise that resolves to a boolean indicating whether the token is valid.
   *          Returns false if the request fails or if the token is invalid.
   */

  private async isVerifyToken(): Promise<boolean> {
    try {

      const response = await lastValueFrom(this.http.get<boolean>(
        `${this.apiUrl}/api/auth/verify`, this.httpOptions));
      return response;
    } catch (error) {
      this.notification.create('error', 'API', 'Desculpe,' +
        ' ocorreu um erro ao processar sua solicitação. Por favor, ' + 
        'tente novamente mais tarde ou contate nosso suporte para obter ajuda.');
        return false;
    }
  }

  /**
   * Logs the user out of the application by removing the authentication token from local storage
   * and navigating back to the login page.
   */

  logout(): void {
    this.isLoggedIn = false;
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  /**
   * Checks if the user is authenticated by verifying the authentication token.
   *
   * @returns A promise that resolves to a boolean indicating whether the user is authenticated.
   *          Returns false if the request fails or if the token is invalid.
   */
  public async isAuthenticated(): Promise<boolean> {
    return await this.isVerifyToken();
  }
}
