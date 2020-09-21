import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopComponent } from './top/top.component';
import {MatIconModule} from '@angular/material/icon';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: TopComponent
},
{
  path: ':searchText',
  component: TopComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
    MatIconModule
  ]
})
export class TopRoutingModule { }
