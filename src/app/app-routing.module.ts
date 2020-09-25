import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'top',
    loadChildren: () => import('./top/top.module').then((mod) => mod.TopModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'room',
    loadChildren: () => import('./room/room.module').then((m) => m.RoomModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
