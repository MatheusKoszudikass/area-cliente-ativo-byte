import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ResponseLogin } from '../../interfaces/response-login.interface';
import { CreateLogin } from '../../interfaces/create-login.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  apiUrl:string = environment.apiLogin;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  };

  constructor(private router: Router, private http: HttpClient) { }

  async login(loginData: CreateLogin): Promise<ResponseLogin> {
      const response = await lastValueFrom(this.http.post<ResponseLogin>(`${this.apiUrl}/api/login`, loginData, this.httpOptions));
      this.verifyLogin(response);
      return response;
  }

  verifyLogin(response: ResponseLogin) {
    if (response.status) {
      console.log("Login bem-sucedido. Dados:", response.data);
      this.router.navigate(['/welcome']);
    } else {
      console.warn("Login falhou.");
      response.message = 'Usuário ou senha inválidos!';
      alert(response.message);
    }
  }

  async isVerifyToken(): Promise<boolean> {
    try {

      const response = await lastValueFrom(this.http.get<boolean>(
        `${this.apiUrl}/api/auth/verify`, this.httpOptions));

      return response;

    } catch (error) {
      return false;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

 async isAuthenticated(): Promise<boolean> {
    return await this.isVerifyToken();
  }
}
