import { Component, OnInit } from '@angular/core';
import { TerminosService } from '../../services/terminos.service';
import { ExamenesService } from '../../services/examenes.service';
import { Termino } from '../../models/termino';
import { Examen } from '../../models/examen';
import { Item } from '../../models/Item';
import { Router } from '@angular/router';

@Component({
    selector: 'new-examen',
    templateUrl: './new-examen.component.html',
    providers: [TerminosService, ExamenesService]
  })
  export class NewExamenComponent implements OnInit {
    currentUser: string;
    private titulo:string;
    private termsMap:Map<number, Termino>;
    private examen:Examen;
  
    constructor(
        private _terminos_service:TerminosService,
        private _examenes_service:ExamenesService,
        private _router:Router
    ) { 
        this.titulo = "Nuevo Examen";
      
    }
  
    ngOnInit() {
        this.getTerminos();
    }




    private getTerminos() {
        this._terminos_service.getTerminos().subscribe(result => {
            this.termsMap = this.create_dict_of_terms(result.terminos);
            console.log(this.termsMap);
            let m = new Date();
            let dateString =  + m.getUTCDate() +
                            "/"+ (m.getUTCMonth()+1) +
                            "/"+ m.getUTCFullYear() +
                            " " + 
                            m.getHours() + ":" + 
                            m.getMinutes() + ":" + 
                            m.getSeconds();         
            let items:Item[] = [];
            result.terminos.forEach((termino => {
                let item = new Item(termino.id, 0, false);
                items.push(item);
            }));
            this.examen = new Examen(dateString, 0, 0, items);  
            console.log(dateString); 
            console.log(this.examen.fecha);
        }, error => {
          if(error.status == 401){
            console.log(<any>error);
          } else {
            //this.alertService.error("Error desconocido");
            console.log(<any>error);
          }   
        });
      }
  
    private create_dict_of_terms(listaTerminos:Termino[]){
        let termsMap = new Map();
        listaTerminos.forEach ( (termino)=>{
            termsMap.set(termino.id, termino);
        })
        return termsMap;
    }

    marcar(item_index:number, acierto:boolean){
        if(!this.examen.items[item_index].contestada) {
            this.examen.items[item_index].contestada = true;
            this.examen.items[item_index].acierto = acierto;
            if(acierto){
                this.examen.aciertos ++;
            } else {       
                 this.examen.fallos ++;       
            }
        }    
    }

    mostrar(item_index:number){
        this.examen.items[item_index].mostrada = true;
    }

    calificarExamen() {
        console.log("Enviar examen");
        console.log(this.examen);
        let json = JSON.stringify(this.examen);
        
        this._examenes_service.addExamen(this.examen).subscribe(
            response=> {
                console.log(response);
                //this._alert_service.success("Examen añadido correctamente", true);
                this._router.navigateByUrl("/examen/"+response.id);
            },
            error => {
                console.log(<any>error);
            }
        );
    }
  }
  