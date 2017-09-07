import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/**
 * Components
 */
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './main.component';

const routes: Routes = [{
  path: '', 
  component: MainComponent,
  children: [{
    path: '',
    component: HomeComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
