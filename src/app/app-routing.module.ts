import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NoAuthGuard } from './core/services/no-auth.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'signup',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'resetpassword/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, // lazy loading DashboardModule
  { path: '**', redirectTo: 'dashboard' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
