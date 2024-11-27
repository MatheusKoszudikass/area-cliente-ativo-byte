import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import {  NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CreateLogin } from '../../interfaces/create-login.interface';
import { DOCUMENT } from '@angular/common'
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NzButtonModule,
    NzCheckboxModule, NzInputModule, NzIconModule, NzAlertModule,
  ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  isButtonDisabled = false;
  passwordVisible: boolean = false;
  isLoadingOne: boolean = false;
  logoUrl: string = '/img/login/Ativo Byte.gif';
  title: string = 'Login';

  loginObj: CreateLogin = {
    email_userName: '',
    password: '',
    remember: false,
    menssage: ''
  };

  validateForm;

  constructor(private router: Router, public authService: AuthService,
    @Inject(DOCUMENT) private document: Document, private fb: NonNullableFormBuilder) {

      this.validateForm = this.fb.group({
        username: this.fb.control('', [Validators.required]),
        password: this.fb.control('', [Validators.required]),
        remember: this.fb.control(true)
      });
    }

    
  async onLogin() {
    this.loginObj.email_userName = this.validateForm.value.username ?? '';
    this.loginObj.password = this.validateForm.value.password ?? '';
    this.loginObj.remember = this.validateForm.value.remember ?? false;
    
    return await this.authService.login(this.loginObj);
  }

  async verifyTokenJWT() {
    const result = await this.authService.isAuthenticated();
  }
  getToggle(action: string) {
    const container = document.getElementById('container') as HTMLElement;

    if (action === 'register') {
      container.classList.add('active');
    } else if (action === 'login') {
      container.classList.remove('active');
    }
  }

  async AttPage(): Promise<void> {
    this.isLoadingOne = true;
    this.isButtonDisabled = true;


    try {
      // Simula a chamada do método login
        const response = await this.onLogin();
        if(response.status)
        {
          setTimeout(() => {
            this.isLoadingOne = false;
            this.isButtonDisabled = false;
            window.location.reload();
          }, 500); // Tempo adicional fixo para garantir transições suaves
        }else {
          this.isLoadingOne = false;
        }
    } finally {

    }
  }
}
