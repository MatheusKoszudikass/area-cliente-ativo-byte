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

  /**
   * @param router - The router to navigate
   * @param authService - The auth service to check if the user is logged in
   * @param document - The document to get the url of the current page
   * @param fb - The form builder to create the form
   */
  constructor(private router: Router, public authService: AuthService,
    @Inject(DOCUMENT) private document: Document, private fb: NonNullableFormBuilder) {

      this.validateForm = this.fb.group({
        username: this.fb.control('', [Validators.required]),
        password: this.fb.control('', [Validators.required]),
        remember: this.fb.control(true)
      });
    }

  /**
   * Performs the login operation, gathering the values from the form and
   * passing them to the auth service to perform the login.
   * @returns A promise that resolves to the response from the login operation.
   */
    
  async onLogin() {
    this.loginObj.email_userName = this.validateForm.value.username ?? '';
    this.loginObj.password = this.validateForm.value.password ?? '';
    this.loginObj.remember = this.validateForm.value.remember ?? false;
    
    return await this.authService.login(this.loginObj);
  }

  /**
   * Verifies if the user is authenticated by checking if the token is valid.
   * Calls the auth service to check if the token is valid.
   * @returns A promise that resolves to a boolean indicating if the user is authenticated.
   */

  async verifyTokenJWT() {
    const result = await this.authService.isAuthenticated();
  }
  
  /**
   * Toggles the class 'active' on the container element, depending on the action passed as parameter.
   * If the action is 'register', the class 'active' is added. If the action is 'login', the class 'active' is removed.
   * @param action - The action to be performed on the container element.
   */
  getToggle(action: string) {
    const container = document.getElementById('container') as HTMLElement;

    if (action === 'register') {
      container.classList.add('active');
    } else if (action === 'login') {
      container.classList.remove('active');
    }
  }

/**
 * Initiates the login process and handles UI state during the operation.
 * Sets loading and button state to indicate an ongoing process.
 * Calls the onLogin method to attempt user login.
 * On successful login, navigates to the home page after a delay for smooth transition.
 * Resets loading and button state based on the outcome of the login process.
 * @returns A promise that resolves once the navigation or error handling is complete.
 */

  async AttPage(): Promise<void> {
    this.isLoadingOne = true;
    this.isButtonDisabled = true;

    try {

        const response = await this.onLogin();
        if(response)
        {
          setTimeout(() => {
            this.isLoadingOne = false;
            this.isButtonDisabled = false;
            this.router.navigate(['/home']);
          }, 500);
        }else {
          this.isLoadingOne = false;
        }
    } finally {

    }
  }
}
