import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterRouteChange;

    constructor(
        private _router: Router) {
            this._router.events.subscribe(event => {
                if (event instanceof NavigationStart) {
                    // Only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert message
                    this.clear();
                }
            })
        }
    
    clear() {
        // clear by calling subject.next() without parameters
        this.subject.next();
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }
    
    success(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'success', text: message });
    }

    error(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'error', text: message });
    }
}