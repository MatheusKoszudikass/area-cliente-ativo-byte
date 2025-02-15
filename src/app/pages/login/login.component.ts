import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CreateLogin } from '../../interfaces/create-login.interface';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [NzButtonModule,
        NzCheckboxModule, NzInputModule, NzIconModule, NzAlertModule,
        ReactiveFormsModule, NzFormModule, NzButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})

export class LoginComponent {

  isButtonDisabled: boolean = false;
  passwordVisible: boolean = false;
  isLoadingOne: boolean = false;
  logoUrl: string = '/img/login/Ativo Byte.gif';
  title: string = 'Login';

  loginObj: CreateLogin = {
    emailUserName: '',
    password: '',
    remember: false,
  };

  formValidadeLogin;
  formValidadeRecoveryAccount;

  /**
   * @param router - The router to navigate
   * @param authService - The auth service to check if the user is logged in
   * @param document - The document to get the url of the current page
   * @param fb - The form builder to create the form
   */
  constructor(private router: Router, public authService: AuthService, 
    private fb: NonNullableFormBuilder) {

      this.formValidadeLogin = this.fb.group({
        username: this.fb.control('', [Validators.required]),
        password: this.fb.control('', [Validators.required]),
        remember: this.fb.control(true)
      });

      this.formValidadeRecoveryAccount = this.fb.group({
        email: this.fb.control('', [Validators.required, Validators.email])
      });
    }

  /**
   * Performs the login operation, gathering the values from the form and
   * passing them to the auth service to perform the login.
   * @returns A promise that resolves to the response from the login operation.
   */
    
  async onLogin() {
    this.loginObj.emailUserName = this.formValidadeLogin.value.username ?? '';
    this.loginObj.password = this.formValidadeLogin.value.password ?? '';
    this.loginObj.remember = this.formValidadeLogin.value.remember ?? false;
    

    return await this.authService.login(this.loginObj);
  }
  
  /**
   * Toggles the class 'active' on the container element, depending on the action passed as parameter.
   * If the action is 'register', the class 'active' is added. If the action is 'login', the class 'active' is removed.
   * @param action - The action to be performed on the container element.
   */
  getToggle(action: string): void {
    const container = document.getElementById('container') as HTMLElement;

    if (action === 'recovery') {
      container.classList.add('active');
    } else if (action === 'login') {
      container.classList.remove('active');
    }
  }
  register(): void {
    this.router.navigate(['/add-user']);
  }

/**
 * Initiates the login process and handles UI state during the operation.
 * Sets loading and button state to indicate an ongoing process.
 * Calls the onLogin method to attempt user login.
 * On successful login, navigates to the home page after a delay for smooth transition.
 * Resets loading and button state based on the outcome of the login process.
 * @returns A promise that resolves once the navigation or error handling is complete.
 */

  public async initiateLogin(): Promise<void> {
    this.isLoadingOne = true;
    this.isButtonDisabled = true;
    await this.onLogin();
    this.isLoadingOne = false;
    this.isButtonDisabled = false;
  }

/**
 * Initiates the account recovery process and handles UI state during the operation.
 * Sets loading and button state to indicate an ongoing process.
 * Extracts the email from the recovery form and calls the auth service to attempt account recovery.
 * On receiving a response, it resets the loading and button state after a delay for user feedback.
 */

  public async initiateRecoveryAccount(): Promise<void> {
    this.isLoadingOne = true;
    this.isButtonDisabled = true;

    this.loginObj.emailUserName = this.formValidadeRecoveryAccount.value.email ?? '';
    
    const response = await this.authService.shippingEmailRecoveryAccount(this.loginObj);

    if(response){
      setTimeout(() => {
        this.isLoadingOne = false;
        this.isButtonDisabled = false;
      }, 500);
    }

    this.isLoadingOne = false;
    this.isButtonDisabled = false;
  } 
}
