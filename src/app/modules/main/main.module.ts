import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Components
 */
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './main.component';
import { TopicComponent } from './components/topic/topic.component';

/**
 * Modules
 */
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from './../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    MainComponent,
    TopicComponent 
  ]
})
export class MainModule { }
