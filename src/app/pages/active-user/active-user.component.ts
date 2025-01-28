import { Component, inject } from '@angular/core';
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
  private authService = inject(AuthService);
  private routerActive = inject(ActivatedRoute);
  private router = inject(Router);

 async ngOnInit(): Promise<void> {
   await this.ativeUser();
 }

  ativeUser = async () => {
  const token = this.routerActive.snapshot.queryParamMap.get('token');

  if(token != null) await this.authService.activeUser(token);
 }
}
