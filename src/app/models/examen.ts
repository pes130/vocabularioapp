import { Item } from './Item';
export class Examen {
    fecha:string;
    aciertos:number;
    fallos:number;
    items: Item[];
    constructor (
        fecha:string,
        aciertos:number,
        fallos:number,
        items: Item[]
    ) {
        this.fecha = fecha;
        this.aciertos = aciertos;
        this.fallos = fallos;
        this.items = items;
    }
}
