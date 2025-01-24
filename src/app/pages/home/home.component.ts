import { CommonModule } from '@angular/common';
import { Component, inject, Input, input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../../services/auth/auth.service';
import { ResponseUserInterface } from '../../interfaces/response-user.interface';
import { UserService } from '../../services/user/user.service';
import { UserValidators } from '../../validators/user/user.validators';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NzLayoutModule, NzMenuModule, NzIconModule, 
    CommonModule, FormsModule, NzSwitchModule, RouterLink, 
    NzAvatarModule, NzButtonModule, RouterOutlet],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})

export class HomeComponent {
  isCollapsed = false;
  isDarkThemeAndLight: boolean = true;
  protected userValidators = inject(UserValidators)
  name: string = 'Juliana';
  colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  color: string = this.colorList[0];
  userObject: ResponseUserInterface = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    cnpjCpfRg: '',
    legalRegister: false,
    userName: '',
    roles: []
  } 
  
  constructor(private router: Router, private authService: AuthService,
    private userService: UserService
  ) { }


  private ngOnInit(): void{
    this.user();
    this.theme();
  }

  private async user(): Promise<void> {
    const dados = await this.userService.findUserTokenSession();

    dados?.data.forEach((user) => {
      this.userObject = user;
    });

    this.name = this.userObject?.firstName ?? '';
  }

  theme(): void {
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'dark'){
      this.isDarkThemeAndLight = true;
      this.setTheme();
    }else if (savedTheme === 'light'){
      this.isDarkThemeAndLight = false;
    }
  }

  toggleTheme(): void {
    this.setTheme();
    localStorage.setItem('theme', this.isDarkThemeAndLight ? 'dark' : 'light');
  }

  setTheme(): void {
    const layout = document.querySelector('.ant-layout') as HTMLElement;
    if(this.isDarkThemeAndLight === true){
      layout?.classList.add('dark-mode');
      layout?.classList.remove('light-mode');
    }else {
      layout?.classList.add('light-mode');
      layout?.classList.remove('dark-mode');
    }
  }
  page(){

    this.router.navigate(['/home/welcome']);
    
  }

  logout(){
    this.userValidators.validateForm.reset();
    this.authService.logout();
  }
}
