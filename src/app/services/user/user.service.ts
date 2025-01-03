import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { environment } from '../../../environments/environment';
import { ResponseApi } from '../../interfaces/response-api.interface';
import { CreateUserInterface } from '../../interfaces/create-user-interface';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { RecoveryAccountInterface } from '../../interfaces/recovery-account-interface';

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

  public async add(user: CreateUserInterface): Promise<void> {
    try {

      const response = await lastValueFrom(this.http.post<ResponseApi<any>>(
        `${this.apiUrl}/api/user/add`, user, this.httpOptions));

      this.notificationOfUserRegistration(response);

    } catch (error) {
      this.notification.create('error', 'API', 'Desculpe,' +
        ' ocorreu um erro ao processar sua solicitação. Por favor, ' +
        'tente novamente mais tarde ou contate nosso suporte para obter ajuda.');
    }
  }
  
  private notificationOfUserRegistration(response: ResponseApi<any>): void {

    if (response.success == true) {
      this.notification.create(
        'success',
        'Usuário',
        response.message,
      );
      this.router.navigate(['/login']);
      return;
    }
    this.notification.create('error', 'Usuário', response.message);
  }

  public async Exist(identifier: string | null | undefined): Promise<boolean> {
    try {
      const response = await lastValueFrom(this.http.post<ResponseApi<any>>(`${ this.apiUrl } / api / user / exist`, { identifier }, this.httpOptions));
      return response.success;
    } catch (error) {
      this.notification.create('error', 'API', 'Desculpe,' +
        ' ocorreu um erro ao processar sua solicitação. Por favor, ' +
        'tente novamente mais tarde ou contate nosso suporte para obter ajuda.');

      return false
    }
  }

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

  private notificationOfUserRecovery(response: ResponseApi<any>): void {

    if (response.success == true) {
      this.notification.create(
        'success',
        'Usuário',
        response.message,
      );
      this.router.navigate(['/login']);
      return;
    }
    this.notification.create('warning', 'Usuário', response.message);
  }


  public validationDocument(documentType: string | null | undefined,
    document: string | null | undefined): boolean {
    if (!document || document.trim().length === 0) return false

    if (documentType === 'CPF') {
      return this.validationCpf(document);
    }
    return this.validationCnpj(document);
  }

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
}
