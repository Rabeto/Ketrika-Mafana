import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';

import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthAdmin } from './services/auth-admin.service';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UtilisateursComponent } from './components/utilisateurs/utilisateurs.component';
import { ParcoursComponent } from './components/parcours/parcours.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { MatieresComponent } from './components/matieres/matieres.component';

const routes: Routes = [
  { path: 'univFianar/selection/login', component: LoginComponent },
  { path: 'univFianar/selection/administrations/home', canActivate: [AuthAdmin], component: AdminHomeComponent },
  { path: 'univFianar/selection/administrations/utilisateurs', canActivate: [AuthAdmin], component: UtilisateursComponent },
  { path: 'univFianar/selection/administrations/parcours', canActivate: [AuthAdmin], component: ParcoursComponent },
  { path: 'univFianar/selection/administrations/sessions', canActivate: [AuthAdmin], component: SessionsComponent },
  { path: 'univFianar/selection/home', canActivate: [AuthGuard],component: HomeComponent },
  { path: 'univFianar/selection/matieres', canActivate: [AuthGuard], component: MatieresComponent},
  { path: '', redirectTo: 'univFianar/selection/login', pathMatch: 'full' },
  { path: '**', component: FourOhFourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
