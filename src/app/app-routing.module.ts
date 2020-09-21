import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
  path: '',
  pathMatch: 'full',
  loadChildren: () =>
  import('./welcome/welcome.module').then((m) => m.
  WelcomeModule),
  },
  {
    path: 'top',
    loadChildren: () =>
      import('./top/top.module').then((mod) => mod.TopModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
