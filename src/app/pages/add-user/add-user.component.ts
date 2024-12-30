import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { CreateUserInterface } from '../../interfaces/create-user-interface';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role/role.service';
import { ResponseRoleInterface } from '../../interfaces/response-role.interface';
import { RouterLink } from '@angular/router';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { UserService } from '../../services/user/user.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { of } from 'rxjs';

@Component({
    selector: 'app-add-user',
    standalone: true,
    imports: [NzButtonModule, NzInputModule, NzSelectModule, FormsModule, RouterLink,
        NzSpaceModule, NzIconModule, ReactiveFormsModule, NzFormModule, NgxMaskDirective],
        providers:[provideNgxMask()],
    templateUrl: './add-user.component.html',
    styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  email: string = 'matheusprgc@gmail.com';
  cpfCnpjStatus: boolean = false;
  passwordStatus: boolean = false;
  loadingEmail: boolean = false;
  passwordVisible: boolean = false;
  validateForm: FormGroup;
  existUserName: boolean = false;
  existEmail: boolean = false;
  isLoadingOne: boolean = false;
  mask: string = '000.000.000-00';
  roles: Array<ResponseRoleInterface> = [];

  createUserForm: CreateUserInterface = {
    email: '',
    roles: [],
    firstName: '',
    lastName: '',
    userName: '',
    cnpjCpfRg: '',
    password: '',
    token: '',
    legalRegister: false,
  };
  
  
  constructor(private fb: FormBuilder, 
    private router: Router, private roleService: RoleService, 
    private userService: UserService, private cdr: ChangeDetectorRef) {

    this. validateForm = this.fb.group({
      firstname: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      lastname: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      username: this.fb.control(
        '',
        [Validators.required, Validators.maxLength(12), Validators.minLength(6)], [this.userNameValidator()],
      ),
      roles: this.fb.control([], [Validators.required]),
      document: this.fb.control('CPF'),
      cpfcnpj: this.fb.control(
        '',
         [Validators.required, this.cpfCnpjValidator()],
      ),
      email: this.fb.control('', [Validators.required, Validators.email],[this.emailValidator()]),
      number: this.fb.control('', [Validators.required, Validators.maxLength(14)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      confirmPassword: this.fb.control('', [Validators.required, this.passwordMatchValidator()]),
    });
  }

  userNameValidator() {
    return async (control:AbstractControl): Promise<ValidationErrors | null> => {
      const userName = control.value;
  
      if (!userName) {
        return of(null); // Campo vazio é tratado pelo Validators.required
      }
  
      try {
        const result = await this.userService.Exist(userName);
        if (result) {
          this.existUserName = false;
          return { usernameExists: true };
        }

        this.existUserName = false;
        return null; // Sem erros
      } catch (error) {
        console.error("Erro ao verificar nome de usuário:", error);
        return null; // Considera válido em caso de erro no serviço
      }
    }
  }

  fecharAviso() {
    const aviso = document.getElementById('aviso');
    aviso!.style.display = 'none';
  }
   emailValidator() {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      const email = control.value;
      this.loadingEmail = true;
  
      if (!email) {
        this.loadingEmail = false;
        this.cdr.detectChanges();
        return null;
      }
  
      try {

        this.existEmail = await this.userService.Exist(email);

        if (this.existEmail  == true) {
          this.existEmail = true;
          this.loadingEmail = false;
          return { emailExists: true};
        }
  
        this.existEmail = false;
        this.loadingEmail = false;
        this.cdr.detectChanges();
        return null; // Sem erros
      } catch (error) {
        console.error("Erro ao verificar e-mail:", error);
        this.cdr.detectChanges();
        return null; // Considera válido em caso de erro no serviço
      }
    };
  }

  passwordMatchValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.validateForm) {
        return null; // Garantir que o formulário está inicializado
      }
  
      const password = this.validateForm.get('password')?.value;
      const confirmPassword = control.value;
  
      if (!password || !confirmPassword) {
        return null; // Não validar se os campos ainda estão vazios
      }
  
      if (password !== confirmPassword) {
        this.passwordStatus = false;
        return { passwordMismatch: true }; // Retorna erro se as senhas não coincidem
      }
  
      this.passwordStatus = true;
      return null; // Sem erros
    };
  }
  cpfCnpjValidator() {
     return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null; // Campo vazio será tratado pelo Validators.required
      }

      const isCpfValid = value.length === 11 && this.userService.validationDocument(
        this.validateForm.value.document,value);

      const isCnpjValid = value.length === 14 && this.userService.validationDocument(
        this.validateForm.value.document,value);

      if (isCpfValid || isCnpjValid) {
        this.cpfCnpjStatus = true;
        return null;
      }

      this.cpfCnpjStatus = false;
      return { invalidDocument: true };
    };
  }


  onDocumentChange(value: string): void {
    if (value === 'CNPJ') {
      this.mask = '00.000.000/0000-00';
    } else {
      this.mask = '000.000.000-00';
    }
  }

  async onUserNameVerify(): Promise<void> {
    this.existUserName = await this.userService.Exist(this.validateForm.value.username);
  }
  async onUserEmailVerify(): Promise<void> {
    this.loadingEmail = true;
    this.existEmail = await this.userService.Exist(this.validateForm.value.email);
    this.loadingEmail = false;
  }

  async ngOnInit(): Promise<void> {
    const dataRole = await this.roleService.findRolesAll();
    
    dataRole.forEach((role) => {
      this.roles.push(role);
    })
  }

  submitForm(): void {
    this.isLoadingOne = true;

      this.createUserForm.email = this.validateForm.value?.email;
      this.createUserForm.roles = this.validateForm.value?.roles;
      this.createUserForm.firstName = this.validateForm.value?.firstname;
      this.createUserForm.lastName = this.validateForm.value?.lastname;
      this.createUserForm.userName = this.validateForm.value?.username;
      this.createUserForm.password = this.validateForm.value?.password;
      this.createUserForm.cnpjCpfRg = this.validateForm.value?.cpfcnpj;
      this.createUserForm.roles = this.validateForm.value?.roles;
 
      // this.createUserForm.number = this.validateForm.value.number;
      this.createUserForm.legalRegister = true;
      this.createUserForm.password = this.validateForm.value.password;
      if(this.validateForm.value.document === 'CPF'){
        this.createUserForm.legalRegister = false;
      }

     const response =  this.userService.add(this.createUserForm);
   
  }
}
