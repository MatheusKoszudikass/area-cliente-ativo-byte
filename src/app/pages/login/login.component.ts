import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CreateLogin } from '../../interfaces/create-login.interface';
import { ResponseLogin } from '../../interfaces/response-login.interface';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NzButtonModule, NzFormModule, NzFormModule, NzCheckboxModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  logoUrl: string = '/img/login/Ativo Byte.gif';
  title: string = 'Login';
  isLoadingOne: boolean = false;

  loginObj: CreateLogin = {
    email_userName: '',
    password: '',
    remember: false,
    menssage: ''
  };

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * @param router - The router to navigate
   * @param authService - The authentication service
   * @param document - The document object to access the session storage
   */
/******  88fae393-6c0d-4429-80b8-cb1f2f203a8c  *******/
constructor(private router: Router, public authService: AuthService, 
  @Inject(DOCUMENT) private document: Document) { }

//   async onLogin(form: NgForm) {
//   if (form.valid) {
//     try {

//       const response = await this.authService.login(this.loginObj);

//       if (sessionStorage.getItem('token')) {
//         this.router.navigate(['/welcome']);
//       } else {
//         this.loginObj.menssage = 'Usuário ou senha inválidos!';
//         alert(this.loginObj.menssage);
//       }
//     } catch (error) {
//       console.error("Erro ao tentar fazer login:", error);
//     }
//   }
// }

async onLogin(form: NgForm) {
  if (form.valid) {
    try {

      const response = await this.authService.login(this.loginObj);

      if (sessionStorage.getItem('token')) {
        this.router.navigate(['/welcome']);
      } else {
        this.loginObj.menssage = 'Usuário ou senha inválidos!';
        alert(this.loginObj.menssage);
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
    }
  }
}

tratarResponse(response: ResponseLogin) {
  if (response.data) {
    console.log("Login bem-sucedido. Dados:", response.data);
    this.router.navigate(['/home']);
  } else {
    console.warn("Login falhou.");
    this.loginObj.menssage = 'Usuário ou senha inválidos!';
    alert(this.loginObj.menssage);
  }
}

getToggle(action: string) {
  const container = document.getElementById('container') as HTMLElement;

  if (action === 'register') {
    container.classList.add('active');
  } else if (action === 'login') {
    container.classList.remove('active');
  }
}

AttPage() {
  this.isLoadingOne = true;
  setTimeout(() => {
    this.isLoadingOne = false;
    window.location.reload();
  }, performance.now());
}
}
