import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdDatepickerModule, MdNativeDateModule, MdCardModule, MdDialogModule, MdSelectModule, MdCheckboxModule,
MdInputModule,MatSnackBarModule, MdIconModule, MdButtonModule, MatSlideToggleModule,MdToolbarModule, MdProgressBarModule, MdChipsModule } from '@angular/material';

/**
 * Components
 */
//import { FormAutocompleteMultipleComponent } from './components/form-autocomplete-multiple/form-autocomplete-multiple.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MenuFullScreenIconsComponent } from './components/menu-full-screen-icons/menu-full-screen-icons.component';
import { MenuSidenavComponent } from './components/menu-sidenav/menu-sidenav.component';
import { MultipleSelectComponent } from './components/multiple-select/multiple-select.component';
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
    MdCardModule,
    MdDatepickerModule,
    MdDialogModule,
    MdSelectModule,
    MdCheckboxModule,
    MdChipsModule,
    MatSnackBarModule,
    MdIconModule,
    MdInputModule,
    MdProgressBarModule,
    MdButtonModule,
    MatSlideToggleModule,
    MdToolbarModule,
    ReactiveFormsModule
  ],
  declarations: [
    //FormAutocompleteMultipleComponent,
    LoginComponent,
    LogoutComponent,
    MenuFullScreenIconsComponent,
    MenuSidenavComponent,
    MultipleSelectComponent,
    TableDataComponent
  ],
  exports: [
    //FormAutocompleteMultipleComponent,
    LoginComponent,
    LogoutComponent,
    MdCardModule,
    MdDatepickerModule,
    MdDialogModule,
    MdSelectModule,
    MdCheckboxModule,
    MdChipsModule,
    MatSnackBarModule,
    MdIconModule,
    MdInputModule,
    MdProgressBarModule,
    MdButtonModule,
    MatSlideToggleModule,
    MdToolbarModule,
    MenuFullScreenIconsComponent,
    MenuSidenavComponent,
    MultipleSelectComponent,
    TableDataComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    CrudService
  ]
})
export class SharedModule { }
