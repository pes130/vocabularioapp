import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TerminosService } from '../../services/terminos.service';
import { ExamenesService } from '../../services/examenes.service';
import { Termino } from '../../models/termino';
import { Examen } from '../../models/examen';

@Component({
    selector: 'examen-detail',
    templateUrl: './examen-detail.component.html',
    providers: [
        TerminosService,
        ExamenesService
    ]
})
export class ExamenDetailComponent implements OnInit {
    examen_actual: Examen;

    constructor(
        private _terminos_service:TerminosService,
        private _examenes_service:ExamenesService,
        private _route:ActivatedRoute,
        private _router:Router) 
    {
        
    }

    ngOnInit(): void {
        this.getTermino();
    }

    getTermino(){
        let id = this._route.snapshot.paramMap.get("id");
        this._examenes_service.getExamen(id).subscribe(
            response=> {
              console.log(response);
                this.examen_actual = response;
            },
            error => {
                console.log(<any>error);
            }
        );
    }

}