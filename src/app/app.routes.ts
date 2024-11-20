import { Routes, RouterModule } from '@angular/router';
import { LOGIN_ROUTES } from './pages/login/login.routes';

export const routes: Routes = [

  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) }
];

