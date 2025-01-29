import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { DocumentsService } from '../../services/documents/documents.service';
import { ResponseRoleInterface } from '../../interfaces/response-role.interface';

@Injectable({
  providedIn: 'root'
})
export class UserValidators {

  private userService = inject(UserService);

  private documentsService = inject(DocumentsService);

  private fb = inject(FormBuilder);

  private emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  userExists = async (): Promise<void> => {
    const userName = this.validateForm.get('userName');

    if (userName?.value.length > 12 || userName?.value.length < 6) return;

    await this.userService.existUser(userName?.value) ?
      (userName?.setErrors({ userNameExists: true })) : userName?.setErrors(null);
  }

  emailValidator = async (): Promise<void> => {
    const email = this.validateForm.get('email');

    if (!this.emailRegex.test(email?.value)) {
      email?.setErrors({ email: true });
      return;
    }

    await this.userService.existUser(email?.value) ?
      (email?.setErrors({ emailExists: true })) : email?.setErrors(null);
  }

  passwordMatchValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.validateForm) {
        return null;
      }

      const password = this.validateForm.get('password')?.value;
      const confirmPassword = control.value;

      if (!password || !confirmPassword) return null;


      if (password !== confirmPassword) return { passwordMismatch: true };
  
      return null;
    };
  }
  cpfCnpjValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const isCpfValid = value.length === 11 && this.documentsService.validationDocumentCpfCnpj(
        this.validateForm.value.document, value);

      const isCnpjValid = value.length === 14 && this.documentsService.validationDocumentCpfCnpj(
        this.validateForm.value.document, value);

      if (isCpfValid || isCnpjValid) {
        return null;
      }
      return { invalidDocument: true };
    };

    public validateForm: FormGroup = this.fb.group({
      firstName: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      lastName: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      userName: this.fb.control(
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(12)],
      ),
      roles: this.fb.control([], [Validators.required]),
      document: this.fb.control('CPF'),
      cnpjCpfRg: this.fb.control(
        '',
        [Validators.required, this.cpfCnpjValidator],
      ),
      email: this.fb.control('', [Validators.required, Validators.email]),
      number: this.fb.control('', [Validators.required, Validators.maxLength(14)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      confirmPassword: this.fb.control('', [Validators.required, this.passwordMatchValidator()]),
    });
  }
