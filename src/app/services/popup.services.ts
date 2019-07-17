import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Mensaje } from '../models/mensaje';


@Injectable({providedIn: 'root'})
export class PopupService {
    private subject = new Subject<Mensaje>();

    constructor() {
           
        }
    
    clear() {
        // clear by calling subject.next() without parameters
        this.subject.next();
    }

    getMessage(): Observable<Mensaje> {
        return this.subject.asObservable();
    }
    
    success(message: string) {       
        this.subject.next(new Mensaje(message, 'success', null));
    }

    info(message: string) {      
        this.subject.next(new Mensaje(message, 'info', null));
    }

    error(message: string) {
        this.subject.next(new Mensaje(message, 'error', null));
    }
}