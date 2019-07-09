import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { GLOBAL } from './global'


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private BASE_URL:string = GLOBAL.url + "/auth";
    private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private _http:HttpClient) { 

    }

    login(user: User): Promise<any> {
        let url: string = `${this.BASE_URL}/login`;
        return this._http.post(url, user, {headers: this.headers}).toPromise();
    }

    /* register(user:User): Promise<any> {
        let url: string = `${this.BASE_URL}/register`;
        return this._http.post(url, user, {headers: this.headers}).toPromise();
    } */

    refresh_token(): Promise<any> {
        let url: string = `${this.BASE_URL}/refresh`;
        const refresh_token = localStorage.getItem('refresh_token');
        let headers: HttpHeaders = new HttpHeaders({Authorization: `Bearer ${refresh_token}`});
        return this._http.post(url, null, {headers: headers}).toPromise();
    }

    logout(): Promise<any> {
        let url: string = `${this.BASE_URL}/logout`;
        const access_token = localStorage.getItem('access_token');
        let headers: HttpHeaders = new HttpHeaders({Authorization: `Bearer ${access_token}`});
        return this._http.delete(url,{headers: headers}).toPromise();
    }

    // TODO pendiente de hacer
    // ensureAuthenticated(token): Promise<any> {
    //     let url: string = `${this.BASE_URL}/status`;
    //     let headers: Headers = new Headers({
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`
    //     });
    //     return this._http.get(url, {headers: this.headers}).toPromise();
    // }
    
    isUserAuthenticated():boolean {
        let isLogged:boolean = false;
        let expires = localStorage.getItem('expires_voc');
        let ahora = parseInt((Date.now()+"").substring(0, 10));

        if(expires && parseInt(expires) > ahora && localStorage.getItem('access_token')){
            isLogged = true;
        } else {            
            isLogged = false;
        }
        return isLogged;
    }
}