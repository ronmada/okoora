import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/homepage',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () =>
      import('./login/login.module').then((x) => x.LoginModule),
  },
  {
    path: 'homepage',
    component: HomepageComponent,
    loadChildren: () =>
      import('./homepage/homepage.module').then((x) => x.HomepageModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/homepage',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
