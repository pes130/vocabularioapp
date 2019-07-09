import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule} from "./material.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { TerminosService } from './services/terminos.service';
import { ExamenesService } from './services/examenes.service';

import { AuthGuard } from './_helpers/auth.guard';
import { LoginRedirectGuard } from './_helpers/login-redirect.guard';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AlertComponent } from './components/alert/alert.component';
import { TerminosListComponent } from './components/terminos/terminos-list.component';
import { TerminoAddComponent } from './components/terminos/termino-add.component';
import { TerminoDetailComponent } from './components/terminos/termino-detail.component';
import { TerminoEditComponent } from './components/terminos/termino-edit.component';
import { NewExamenComponent } from './components/examenes/new-examen.component';
import { ExamenesListComponent } from './components/examenes/examenes-list.component';
import { ExamenDetailComponent } from './components/examenes/examen-detail.component';
import { ResultadosComponent } from './components/examenes/resultados.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
    TerminosListComponent,
    TerminoAddComponent,
    TerminoDetailComponent,
    TerminoEditComponent,
    NewExamenComponent,
    ExamenesListComponent,
    ExamenDetailComponent,
    ResultadosComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    AlertService,
    AuthGuard,
    LoginRedirectGuard,
    TerminosService,
    ExamenesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
