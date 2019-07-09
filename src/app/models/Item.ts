export class Item {
    termino_id: number;
    examen_id: number;
    acierto: boolean;
    mostrada: boolean = false;
    contestada: boolean = false;
    
    constructor (
        termino_id: number,
        examen_id: number,
        acierto: boolean,

    ) {
        this.termino_id = termino_id;
        this.examen_id = examen_id;
        this.acierto = acierto;
        
    }
}