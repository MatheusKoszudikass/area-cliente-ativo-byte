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
import { RoleService } from '../../services/role/role.service';
import { ResponseRoleInterface } from '../../interfaces/response-role.interface';
import { RouterLink } from '@angular/router';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { UserService } from '../../services/user/user.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { UserValidators } from '../../validators/user/user.validators';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [NzButtonModule, NzInputModule, NzSelectModule, FormsModule, RouterLink,
    NzSpaceModule, NzIconModule, ReactiveFormsModule, NzFormModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  protected userValidators = inject(UserValidators);
  email: string = 'matheusprgc@gmail.com';
  cpfCnpjStatus: boolean = false;
  passwordStatus: boolean = false;
  passwordVisible: boolean = false;
  existEmail: boolean = false;
  isLoadingOne: boolean = false;
  mask: string = '000.000.000-00';
  public role: Array<ResponseRoleInterface> = [];
  protected userService = inject(UserService);
  protected roleService: Promise<ResponseRoleInterface[] | undefined> = inject(RoleService)
  .findRolesAll().then((res) => {
    res?.data.forEach((role) => {
      this.role.push(role);
    })
    return res?.data;
  });

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
    onDocumentChange = (value: string): void => {
      value === 'CNPJ'? (this.mask = '00.000.000/0000-00'): (this.mask = '000.000.000-00');
    };

   async submitForm(): Promise<void> {
    this.isLoadingOne = true;

    this.createUserForm = {...this.userValidators.validateForm.value};

    this.createUserForm.legalRegister = true;

    if (this.userValidators.validateForm.value.document === 'CPF') {
      this.createUserForm.legalRegister = false;
    }

    await this.userService.add(this.createUserForm) ? (this.userValidators.validateForm.reset()) : null;
    this.userValidators.validateForm.get('document')?.setValue('CPF');
    this.isLoadingOne = false;
  }

  ngOnDestroy() {
    this.userValidators.validateForm.get('password')?.setValue('');
    this.userValidators.validateForm.get('confirmPassword')?.setValue('');
    this.userValidators.validateForm.get('userName')?.setValue('');
    this.userValidators.validateForm.get('email')?.setValue('');
    this.userValidators.emailVerified = '';
    this.userValidators.userNameVerified = '';
  }
}
