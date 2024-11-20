import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { LOGIN_ROUTES } from './pages/login/login.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  isLoading = true;
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    // Lógica de autenticação
    document.body.className = '';

       this.isAuthenticated = await this.authService.isAuthenticated();

      if (this.isAuthenticated) {
        this.isLoading = false
      } else {
        this.authService.logout();
        this.isAuthenticated = false;
        this.isLoading = false
      }

    // Limpa as classes do body ao inicializar

    // Verifica se o usuário está autenticado
    if (!this.isAuthenticated) {
      document.body.classList.add('login-body'); // Adiciona classe para login
    } else {
      // Se autenticado, define a classe padrão ou específica para rotas
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          document.body.className = ''; // Limpa as classes do body

          // Adiciona classes dependendo da rota
          if (this.router.url === '/welcome') {
            document.body.classList.add('welcome-body');
          } else {
            document.body.classList.add('default-body');
          }
        }
      });
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
