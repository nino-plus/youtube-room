import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopComponent } from './top/top.component';
import { MatIconModule } from '@angular/material/icon';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TopComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: ':searchText',
    component: TopComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, MatIconModule],
})
export class TopRoutingModule {}
