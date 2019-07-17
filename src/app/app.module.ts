import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule} from "./material.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PopupModule } from 'ng2-opd-popup';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';
import { TerminosService } from './services/terminos.service';
import { ExamenesService } from './services/examenes.service';
import { MessagesService } from './services/messages.services';
import { PopupService } from './services/popup.services';

import { AuthGuard } from './_helpers/auth.guard';
import { LoginRedirectGuard } from './_helpers/login-redirect.guard';

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
import { MessagesComponent } from './components/alert/messages.component';

import { HttpErrorInterceptor } from './_helpers/http.error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TerminosListComponent,
    TerminoAddComponent,
    TerminoDetailComponent,
    TerminoEditComponent,
    NewExamenComponent,
    ExamenesListComponent,
    ExamenDetailComponent,
    ResultadosComponent,
    ErrorComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    PopupModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    LoginRedirectGuard,
    TerminosService,
    MessagesService,
    ExamenesService,
    PopupService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
