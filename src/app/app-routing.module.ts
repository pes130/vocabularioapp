import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TerminosListComponent } from './components/terminos/terminos-list.component';
import { TerminoAddComponent } from './components/terminos/termino-add.component';
import { TerminoDetailComponent } from './components/terminos/termino-detail.component';
import { TerminoEditComponent } from './components/terminos/termino-edit.component';
import { NewExamenComponent } from './components/examenes/new-examen.component';
import { ExamenesListComponent } from './components/examenes/examenes-list.component';
import { ExamenDetailComponent } from './components/examenes/examen-detail.component';
import { ResultadosComponent } from './components/examenes/resultados.component';
import { ErrorComponent } from './components/error/error.component';

import { AuthGuard } from './_helpers/auth.guard';
import { LoginRedirectGuard } from './_helpers/login-redirect.guard';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [LoginRedirectGuard] 
  },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'terminos', 
    component: TerminosListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'termino/:id', 
    component: TerminoDetailComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'termino-add', 
    component: TerminoAddComponent,
    canActivate: [AuthGuard]
  }, 
  { 
    path: 'termino/:id/edit', 
    component: TerminoEditComponent,
    canActivate: [AuthGuard]
  }, 
  { 
    path: 'examen-add', 
    component: NewExamenComponent,
    canActivate: [AuthGuard]
  }, 
  { 
    path: 'examenes', 
    component: ExamenesListComponent,
    canActivate: [AuthGuard]
  }, 
  { 
    path: 'examen/:id', 
    component: ExamenDetailComponent,
    canActivate: [AuthGuard]
  }, 
  { 
    path: 'resultados', 
    component: ResultadosComponent,
    canActivate: [AuthGuard]
  }, 
  { 
    path: '', 
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '**', 
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
