import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

/**
 * Components
 */
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MenuFullScreenIconsComponent } from './components/menu-full-screen-icons/menu-full-screen-icons.component';

/**
 * Services
 */
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { CrudService } from './services/crud.service';
import { TableDataComponent } from './components/table-data/table-data.component';
import { MenuSidenavComponent } from './components/menu-sidenav/menu-sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    MenuFullScreenIconsComponent,
    MenuSidenavComponent,
    LoginComponent,
    LogoutComponent,
    TableDataComponent
  ],
  exports: [
    MaterialModule,
    MenuFullScreenIconsComponent,
    MenuSidenavComponent,
    LoginComponent,
    LogoutComponent,
    TableDataComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    CrudService
  ]
})
export class SharedModule { }
