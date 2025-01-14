import { Routes, RouterModule } from '@angular/router';
import { ActiveUserComponent } from './pages/active-user/active-user.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth/auth.guard';
import { loginGuard } from './guard/login/login.guard';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { ProfileUserComponent } from './pages/profile-user/profile-user.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'}, // Redireciona para login por padrão
  
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] }, 
  
  { path: 'active-user', component: ActiveUserComponent },

  { path: 'add-user', component: AddUserComponent},

  { path: 'reset-password', component: ResetPasswordComponent},

  { 
    path: 'home', 
    component: HomeComponent, 
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'profile-user', component: ProfileUserComponent }, 
    ],
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' } 

];

