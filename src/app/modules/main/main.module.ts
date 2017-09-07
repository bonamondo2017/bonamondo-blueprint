import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Components
 */
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './main.component';

/**
 * Modules
 */
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from './../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    MainComponent 
  ]
})
export class MainModule { }
