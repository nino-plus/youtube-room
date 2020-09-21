import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
 {
  path: '',
  component: WelcomeComponent
 },
//  {
//   path: 'top',
//   loadChildren: () =>
//     import('../top/top.module').then((m) => m.TopModule),
// },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
