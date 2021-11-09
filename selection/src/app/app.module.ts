import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { UtilisateursComponent } from './components/utilisateurs/utilisateurs.component';
import { DialogAddUserComponent } from './components/dialogs/dialog-add-user/dialog-add-user.component';
import { DialogDeleteConfirmationComponent } from './components/dialogs/dialog-delete-confirmation/dialog-delete-confirmation.component';

import { AuthGuard } from './services/auth-guard.service';
import { AuthAdmin } from './services/auth-admin.service';
import { UsersService } from './services/users.service';
import { ParcoursService } from './services/parcours.service';
import { SessionsService } from './services/sessions.service';
import { MatieresService } from './services/matieres.service';
import { DossiersService } from './services/dossiers.service';
import { RelevesService } from './services/releves.service';
import { NotesService } from './services/notes.service';

import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { BanniereComponent } from './components/banniere/banniere.component';
import { DialogParcoursComponent } from './components/dialogs/dialog-parcours/dialog-parcours.component';
import { ParcoursComponent } from './components/parcours/parcours.component';
import { DialogAddParcoursComponent } from './components/dialogs/dialog-add-parcours/dialog-add-parcours.component';
import { DialogUpdateParcoursComponent } from './components/dialogs/dialog-update-parcours/dialog-update-parcours.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { DialogAddSessionComponent } from './components/dialogs/dialog-add-session/dialog-add-session.component';
import { DialogCloseSessionComponent } from './components/dialogs/dialog-close-session/dialog-close-session.component';
import { DialogWarningComponent } from './components/dialogs/dialog-warning/dialog-warning.component';
import { DialogLogoutComponent } from './components/dialogs/dialog-logout/dialog-logout.component';
import { MatieresComponent } from './components/matieres/matieres.component';
import { DialogAddMatiereComponent } from './components/dialogs/dialog-add-matiere/dialog-add-matiere.component';
import { DialogUpdateMatiereComponent } from './components/dialogs/dialog-update-matiere/dialog-update-matiere.component';
import { DialogDetailsDossierComponent } from './components/dialogs/dialog-details-dossier/dialog-details-dossier.component';
import { DialogUpdateNoteComponent } from './components/dialogs/dialog-update-note/dialog-update-note.component';
import { DialogAddDossierComponent } from './components/dialogs/dialog-add-dossier/dialog-add-dossier.component';
import { DialogAddNotesComponent } from './components/dialogs/dialog-add-notes/dialog-add-notes.component';
import { DialogAdminDetailsDossierComponent } from './components/dialogs/dialog-admin-details-dossier/dialog-admin-details-dossier.component';
import { DialogChangePasswordComponent } from './components/dialogs/dialog-change-password/dialog-change-password.component';
import { DialogUpdateCompteComponent } from './components/dialogs/dialog-update-compte/dialog-update-compte.component';
const materialModules = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule, 
  MatExpansionModule,
  MatCardModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FourOhFourComponent,
    HomeComponent,
    MainComponent,
    UtilisateursComponent,
    AdminHomeComponent,
    AdminMainComponent,
    BanniereComponent,
    DialogAddUserComponent,
    DialogDeleteConfirmationComponent,
    DialogParcoursComponent,
    ParcoursComponent,
    DialogAddParcoursComponent,
    DialogUpdateParcoursComponent,
    SessionsComponent,
    DialogAddSessionComponent,
    DialogCloseSessionComponent,
    DialogWarningComponent,
    DialogLogoutComponent,
    MatieresComponent,
    DialogAddMatiereComponent,
    DialogUpdateMatiereComponent,
    DialogDetailsDossierComponent,
    DialogUpdateNoteComponent,
    DialogAddDossierComponent,
    DialogAddNotesComponent,
    DialogAdminDetailsDossierComponent,
    DialogChangePasswordComponent,
    DialogUpdateCompteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ...materialModules
  ],
  providers: [
    AuthGuard,
    AuthAdmin,
    UsersService,
    ParcoursService,
    SessionsService,
    MatieresService,
    DossiersService,
    RelevesService,
    NotesService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogAddUserComponent,
    DialogDeleteConfirmationComponent,
    DialogParcoursComponent,
    DialogParcoursComponent,
    DialogUpdateParcoursComponent,
    DialogAddSessionComponent,
    DialogCloseSessionComponent,
    DialogAddMatiereComponent,
    DialogDetailsDossierComponent,
    DialogUpdateNoteComponent,
    DialogAddNotesComponent,
    DialogAdminDetailsDossierComponent,
    DialogChangePasswordComponent,
    DialogUpdateCompteComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
