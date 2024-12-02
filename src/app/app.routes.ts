import { Routes, RouterModule } from '@angular/router';
import { ActiveUserComponent } from './pages/active-user/active-user.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';
import { loginGuard } from './guard/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'}, // Redireciona para login por padrão
  
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] }, 
  
  { path: 'active-user', component: ActiveUserComponent },
  // Página home com proteção de autenticação
  { 
    path: 'home', 
    component: HomeComponent, // Protege a rota home com authGuard
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'login', component: LoginComponent }, // Exemplo de rota filha
      // Adicione outras rotas filhas conforme necessário
    ],
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' } // Redirecionar para login para rotas inválidas

];

