import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Examen } from '../models/examen';

@Injectable({
  providedIn: 'root'
})
export class ExamenesService {
  private url:string;

  constructor(private _http:HttpClient) { 
    this.url = GLOBAL.url;
  }

  getExamenes(): Observable<any> {
    const access_token = localStorage.getItem('access_token');
    let headers: HttpHeaders = new HttpHeaders({Authorization: `Bearer ${access_token}`});
    return this._http.get(this.url+'/exams',{headers: headers});
  }

  getExamen(id): Observable<any>{
    const access_token = localStorage.getItem('access_token');
    let headers: HttpHeaders = new HttpHeaders({Authorization: `Bearer ${access_token}`});
    return this._http.get(this.url+'/exam/'+id,{headers: headers});
  }

  addExamen(examen:Examen): Observable<any> {
    let json = JSON.stringify(examen);
    let params = json;
    const access_token = localStorage.getItem('access_token');
    let headers:HttpHeaders = new HttpHeaders({'Content-type':'application/json', Authorization: `Bearer ${access_token}`});
    return this._http.post(this.url+'/exam2', params, {headers}); 
  }

  getResultados(): Observable<any> {
    const access_token = localStorage.getItem('access_token');
    let headers: HttpHeaders = new HttpHeaders({Authorization: `Bearer ${access_token}`});
    return this._http.get(this.url+'/results',{headers: headers});
  }
  
  
 
}