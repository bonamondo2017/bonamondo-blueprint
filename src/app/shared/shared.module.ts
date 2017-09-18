import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

/**
 * Components
 */
import { FormAutocompleteMultipleComponent } from './components/form-autocomplete-multiple/form-autocomplete-multiple.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MenuFullScreenIconsComponent } from './components/menu-full-screen-icons/menu-full-screen-icons.component';
import { MenuSidenavComponent } from './components/menu-sidenav/menu-sidenav.component';
import { TableDataComponent } from './components/table-data/table-data.component';

/**
 * Services
 */
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { CrudService } from './services/crud.service';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    FormAutocompleteMultipleComponent,
    MenuFullScreenIconsComponent,
    MenuSidenavComponent,
    LoginComponent,
    LogoutComponent,
    TableDataComponent
  ],
  exports: [
    FormAutocompleteMultipleComponent,
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
