import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ResponseLogin} from '../../interfaces/response-login.interface';
import { CreateLogin } from '../../interfaces/create-login.interface';	

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;


  constructor(private router: Router, private http: HttpClient) { }

  async login(loginData: CreateLogin): Promise<ResponseLogin> {
    try {

       const response = await lastValueFrom(this.http.post<ResponseLogin>('/api/login', loginData));
      console.log(response)
      if (response.success === true) {
        this.isLoggedIn = true;
        const token = response;
        sessionStorage.setItem('token', response.data[0]);
      }

      return response;

    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn || !!sessionStorage.getItem('token');
  }
}
