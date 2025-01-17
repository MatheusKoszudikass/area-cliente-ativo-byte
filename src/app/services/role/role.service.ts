import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { lastValueFrom } from 'rxjs';
import { ResponseRoleInterface } from '../../interfaces/response-role.interface';
import { ResponseApi } from '../../interfaces/response-api.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiUrl: string = environment.apiLogin;
  
  constructor(private router: Router, private http: HttpClient, 
    private notification: NzNotificationService) { }

  /**
   * Finds all roles by sending a GET request to the server.
   * 
   * @returns A promise that resolves to the array of roles if the request is successful.
   *          Returns null if the request fails or if the user is not logged in.
   */
  public async findRolesAll(): Promise<ResponseApi<ResponseRoleInterface>| null> {
   try{

    return await lastValueFrom(this.http.get<ResponseApi<ResponseRoleInterface>>(
      `${this.apiUrl}/api/role/findAll`));

   }catch(erro){
    this.notification.create('error', 'API', 'Desculpe,' +
      ' ocorreu um erro ao processar sua solicitação. Por favor, ' +
      'tente novamente mais tarde ou contate nosso suporte para obter ajuda.');
      return null;
   }
  }
}

