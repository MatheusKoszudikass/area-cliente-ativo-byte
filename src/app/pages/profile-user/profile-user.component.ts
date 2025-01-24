import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserValidators } from '../../validators/user/user.validators';
import { CreateUserInterface } from '../../interfaces/create-user-interface';
import { UserService } from '../../services/user/user.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { RouterLink } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ResponseRoleInterface } from '../../interfaces/response-role.interface';
import { RoleService } from '../../services/role/role.service';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [NzButtonModule, NzInputModule, NzSelectModule, FormsModule,
    NzSpaceModule, NzIconModule, ReactiveFormsModule, NzFormModule,
    NgxMaskDirective, NzUploadModule],
  providers: [provideNgxMask()],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss'
})
export class ProfileUserComponent {
  loading = false;
  avatarUrl?: string;

  public userValidators = inject(UserValidators);
  protected userService = inject(UserService);
  private messageService = inject(NzMessageService);


  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      console.log(file);
      console.log(_fileList);
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.messageService.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.messageService.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    console.log(info);
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.messageService.error('Network error');
        this.loading = false;
        break;
    }
  }

  email: string = 'matheusprgc@gmail.com';
  cpfCnpjStatus: boolean = false;
  passwordStatus: boolean = false;
  passwordVisible: boolean = false;
  existEmail: boolean = false;
  isLoadingOne: boolean = false;
  mask: string = '000.000.000-00';
  public role: Array<ResponseRoleInterface> = [];
  protected roleService: Promise<ResponseRoleInterface[] | undefined> = inject(RoleService)
    .findRolesAll().then((res) => {
      res?.data.forEach((role) => {
        this.role.push(role);
      })
      return res?.data;
    });

  ngOnInit() {
    this.findUser();
  }

  private findUser = () : void => {
    this.userService.findUserTokenSession().then(user => {
      user?.data.map(user => {
        const role = this.role.filter(r => r.id === user.roles[0]?.id);
        this.userValidators.validateForm.patchValue(user);
        this.userValidators.validateForm.get('roles')?.patchValue(role);
      })
    });

  }
  isSeleted(value: ResponseRoleInterface): boolean {
    return this.role.indexOf(value) !== -1;
  }

  onDocumentChange = (value: string): void => {
    value === 'CNPJ' ? (this.mask = '00.000.000/0000-00') : (this.mask = '000.000.000-00');
  };

  submitForm() {
  }
}
