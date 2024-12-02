import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-active-user',
  standalone: true,
  imports: [],
  templateUrl: './active-user.component.html',
  styleUrl: './active-user.component.scss'
})
export class ActiveUserComponent {
 constructor(private authService: AuthService, private routerActive: ActivatedRoute, private router: Router ) { }

 ngOnInit(): void {
  const token = this.routerActive.snapshot.queryParamMap.get('token');

  if(token != null)this.authService.activeUser(token);
  setTimeout(() => {
    this.router.navigate(['/login']);
  }, 3000);
 }
}
