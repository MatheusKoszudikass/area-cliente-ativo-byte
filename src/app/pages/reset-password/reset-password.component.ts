import { Component } from '@angular/core';
import { FormBuilder, 
FormGroup, 
FormsModule, 
ReactiveFormsModule,
Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { UserService } from '../../services/user/user.service';
import { passwordMatchValidator } from '../../validators/passwordMatchValidator-validators';
import { RecoveryAccountInterface } from '../../interfaces/recovery-account-interface';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [NzButtonModule, NzInputModule, FormsModule,
    RouterLink, NzSpaceModule, ReactiveFormsModule, NzFormModule,
  NzIconModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  passwordVisible: boolean = false;
  passwordVisible1: boolean = false;
  validateForm: FormGroup;
  isLoadingOne: boolean = false;
  recoveryAccount: RecoveryAccountInterface = {
    token: '',
    password: ''
  } 

  constructor(private fb: FormBuilder, 
    private router: Router, private userService: UserService, private routerActive: ActivatedRoute) {
      this.validateForm = this.fb.group({
        password: this.fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
        confirmPassword: this.fb.control('', [Validators.required]),
      },
      {
        validators: passwordMatchValidator
      })
  }
  
  /**
   * This function is called when the user submits the password reset form.
   * It gets the token from the route and the new password from the form,
   * and sends a request to the server to reset the password.
   * If the request is successful, it sets isLoadingOne to false.
   * If the request fails, it also sets isLoadingOne to false.
   * @returns a Promise of void.
   */
  async submitForm() {
    this.isLoadingOne = true;

    this.recoveryAccount.token = this.routerActive.snapshot.queryParamMap.get('token') ?? '';
    this.recoveryAccount.password = this.validateForm.value.confirmPassword ?? '';

     if( await this.userService.recoveryAccount(this.recoveryAccount)) 
     {
        this.isLoadingOne = false;
     }else {
        this.isLoadingOne = false;
     }
    }
}
