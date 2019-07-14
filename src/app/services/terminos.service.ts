import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Termino } from '../models/termino';

@Injectable({
  providedIn: 'root'
})
export class TerminosService {
  private url:string;

  constructor(private _http:HttpClient) { 
    this.url = GLOBAL.url;
  }

  getTerminos(): Observable<any> {
    const access_token = localStorage.getItem('access_token');
    let headers: HttpHeaders = new HttpHeaders({Authorization: `Bearer ${access_token}`});
    return this._http.get(this.url+'/terms',{headers: headers});
  }

  getTipos(): Observable<any> {
    const access_token = localStorage.getItem('access_token');
    let headers: HttpHeaders = new HttpHeaders({Authorization: `Bearer ${access_token}`});
    return this._http.get(this.url+'/types',{headers: headers});
  }

  getTerminosByTipo(tipo): Observable<any> {
    const access_token = localStorage.getItem('access_token');
    let headers: HttpHeaders = new HttpHeaders({Authorization: `Bearer ${access_token}`});
    return this._http.get(this.url+'/terms/'+tipo,{headers: headers});
  }

  getTermino(id): Observable<any>{
    const access_token = localStorage.getItem('access_token');
    let headers: HttpHeaders = new HttpHeaders({Authorization: `Bearer ${access_token}`});
    return this._http.get(this.url+'/term/'+id,{headers: headers});
  }

  addTermino(termino:Termino): Observable<any> {
    let json = JSON.stringify(termino);
    let params = json;
    const access_token = localStorage.getItem('access_token');
    let headers:HttpHeaders = new HttpHeaders({'Content-type':'application/json', Authorization: `Bearer ${access_token}`});

    return this._http.post(this.url+'/term', params, {headers}); 
  }

  updateTermino(id, termino:Termino): Observable<any> {
    let json = JSON.stringify(termino);
    let params = json;
    const access_token = localStorage.getItem('access_token');
    let headers:HttpHeaders = new HttpHeaders({'Content-type':'application/json', Authorization: `Bearer ${access_token}`});
    return this._http.put(this.url+'/term/'+id, params, {headers}); 
  }
  
 
}