import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { environment } from '../../../environments/environment';
import { ResponseApi } from '../../interfaces/response-api.interface';
import { CreateUserInterface } from '../../interfaces/create-user-interface';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.apiLogin;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }
  constructor(private router: Router, private http: HttpClient,
    private notification: NzNotificationService
  ) { }

  public async add(user: CreateUserInterface): Promise<ResponseApi | null> {
    try {
      const response = await lastValueFrom(this.http.post<ResponseApi>(`${this.apiUrl}/api/user/add`, user, this.httpOptions));
      return response;
    } catch (error) {
      this.notification.create('error', 'API', 'Desculpe,' +
        ' ocorreu um erro ao processar sua solicitação. Por favor, ' +
        'tente novamente mais tarde ou contate nosso suporte para obter ajuda.');

        console.error(error);
    }
    return null
  }
}
