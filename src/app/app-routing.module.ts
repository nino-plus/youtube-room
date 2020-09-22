import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomComponent } from './room/room/room.component';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [
  {
    path: 'top',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./top/top.module').then((mod) => mod.TopModule),
      },
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'room',
    component: RoomComponent,
    loadChildren: () => import('./room/room.module').then((m) => m.RoomModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
