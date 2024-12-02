import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
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

  constructor(private router: Router, private http: HttpClient, private notification: NzNotificationService) { }

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Authenticates the user by sending a login request to the server.
 * 
 * @param loginData - The login credentials, including email/username and password.
 * @returns A promise that resolves to a ResponseLogin object containing the status and message of the login attempt.
 * @throws An error if the HTTP request fails.
 */

/******  3ed65979-4e28-4fa8-af2b-66bcef221b67  *******/
  async login(loginData: CreateLogin): Promise<ResponseLogin> {
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
  async isAuthenticated(): Promise<boolean> {
    return await this.isVerifyToken();
  }
}
