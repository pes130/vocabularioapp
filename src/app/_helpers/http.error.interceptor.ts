import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler,HttpHeaders, HttpRequest, HttpClient, HttpErrorResponse} from "@angular/common/http";
import {HttpInterceptor} from "@angular/common/http";
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, switchMap,  } from 'rxjs/operators'; 


import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;
    private _refreshSubject: Subject<any> = new Subject<any>();
    constructor(
        private http: HttpClient,
        private _auth_service:AuthService) { }

    
    private _ifTokenExpired() {
        this._refreshSubject.subscribe({
            complete: () => {
            // cuando haya acabado todo lo reinstancio
            this._refreshSubject = new Subject<any>();
            }
        });
        // Si es la primera petición que tenemos encolada esperando token
        if (this._refreshSubject.observers.length === 1) {
            this._auth_service.refresh_token().subscribe(this._refreshSubject);
        }
        return this._refreshSubject;
    }

    private _checkTokenExpiryErr(error: HttpErrorResponse): boolean {
        return (
          error.status &&
          error.status === 401 &&
          error.error &&
          error.error.error === "token_expired"
        );
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.endsWith("/logout") || req.url.endsWith("/refresh")) {
            return next.handle(req);
          } else {
            return next.handle(req).pipe(
              catchError((error, caught) => {
                if (error instanceof HttpErrorResponse) {
                  if (this._checkTokenExpiryErr(error)) {
                    return this._ifTokenExpired().pipe(
                      switchMap((result) => {
                        localStorage.setItem('access_token', result.access_token);
                        localStorage.setItem('expires_voc', result.expires);
                        return next.handle(this.updateHeader(req, result.access_token));
                      })
                    );
                  } else {
                    return throwError(error);
                  }
                }
                return caught;
              })
            );
        }
    }

   

    updateHeader(req, new_access_token) {    
        req = req.clone({
          headers: req.headers.set("Authorization", `Bearer ${new_access_token}`)
        });
        return req;
      }
}


