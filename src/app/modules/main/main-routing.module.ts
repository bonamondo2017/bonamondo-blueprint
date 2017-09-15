import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/**
 * Components
 */
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './main.component';
import { TopicComponent } from './components/topic/topic.component';

const routes: Routes = [{
  path: '', 
  component: MainComponent,
  children: [{
    path: '',
    component: HomeComponent
  }, {
    path: 'topic',
    component: TopicComponent
  }, {
    path: 'topic/:id',
    component: TopicComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
