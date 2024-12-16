import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  FormBuilder
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



@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [NzButtonModule,NzInputModule, NzSelectModule, FormsModule, RouterLink,
     NzSpaceModule, NzIconModule, ReactiveFormsModule, NzFormModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  validateForm;
  value?: string;
  isLoadingOne: boolean = false;
  confirmPassword: string = '';
  selectedRole: string = '';
  legalPerson: string = 'CPF';
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
    legalRegister: false
  };
  
  constructor(private fb: FormBuilder, 
    private router: Router, private roleService: RoleService, 
    private userService: UserService) {

    this. validateForm = this.fb.group({
      firstname: this.fb.control('', [Validators.required]),
      lastname: this.fb.control('', [Validators.required]),
      username: this.fb.control(
        '',
        [Validators.required, Validators.maxLength(12), Validators.minLength(6)],
      ),
      roles: this.fb.control([], [Validators.required]),
      document: this.fb.control('CPF', [Validators.required]),
      cpfcnpj: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      number: this.fb.control('', [Validators.required, Validators.nullValidator]),
      password: this.fb.control('', [Validators.required]),
      confirmPassword: this.fb.control('', [Validators.required]),
      legalPerson: this.fb.control('', [Validators.required])
    });
  }

  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项'
    },
    en: {
      required: 'Input is required'
    },
    default: {
      email: '邮箱格式不正确/The input is not valid email'
    }
  };

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
      console.log(this.validateForm.value.document );
      if(this.validateForm.value.document === 'CPF'){
        this.createUserForm.legalRegister = false;
      }

     const response =  this.userService.add(this.createUserForm);

    console.log(this.createUserForm);
   
  }
}
