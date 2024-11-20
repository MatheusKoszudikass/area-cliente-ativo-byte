import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CreateLogin } from '../../interfaces/create-login.interface';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NzButtonModule, NzFormModule, NzFormModule, NzCheckboxModule, NzInputModule, NzIconModule, FormsModule],
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

  constructor(private router: Router, public authService: AuthService,
    @Inject(DOCUMENT) private document: Document) { this.router.navigate(['/login']); }

  async onLogin() {
    const response = await this.authService.login(this.loginObj);
  }

  async verifyTokenJWT() {
    const result = await this.authService.isVerifyToken();
  }
  getToggle(action: string) {
    const container = document.getElementById('container') as HTMLElement;

    if (action === 'register') {
      container.classList.add('active');
    } else if (action === 'login') {
      container.classList.remove('active');
    }
  }

  async AttPage(form: NgForm) {
    this.isLoadingOne = true;
    this.isButtonDisabled = true;

    try {
      // Simula a chamada do método login
      if (form.valid) {
        await this.onLogin();
      }
    } finally {

      setTimeout(() => {
        this.isLoadingOne = false;
        this.isButtonDisabled = false;
        window.location.reload();
      }, 500); // Tempo adicional fixo para garantir transições suaves
    }
  }
}
