import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { WelcomeComponent } from '../welcome/welcome.component';
import { LoginComponent } from '../login/login.component';
import { RouterOutlet, Router } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzLayoutModule, NzMenuModule, NzIconModule, CommonModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isCollapsed = false;


  constructor(private router: Router) { }

  page(){
    this.router.navigate(['/home/welcome']);
  }

}
