import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { lastValueFrom } from 'rxjs';
import { ResponseRoleInterface } from '../../interfaces/response-role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiUrl: string = environment.apiLogin;
  
  constructor(private router: Router, private http: HttpClient, 
    private notification: NzNotificationService) { }

  public async findRolesAll(): Promise<Array<ResponseRoleInterface>> {
   try{

    const response = await lastValueFrom(this.http.get<Array<ResponseRoleInterface>>(`${this.apiUrl}/api/role/findAll`));
    return response;

   }catch(erro){
    this.notification.create('error', 'API', 'Desculpe,' +
      ' ocorreu um erro ao processar sua solicitação. Por favor, ' +
      'tente novamente mais tarde ou contate nosso suporte para obter ajuda.');
      return [];
   }
  }
}

