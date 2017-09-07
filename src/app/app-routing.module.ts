import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

/**
 * Components
 */
import { LoginComponent } from './components/login/login.component';

/**
 * Guards
 */
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'main',
  loadChildren: './modules/main/main.module#MainModule',
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
