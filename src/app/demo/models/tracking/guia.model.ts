import { Items } from './item.model';

export interface Guia {
    pedido          : number;
    guia1           : number;
    docDate         : Date;
    cardCode        : string;
    items           : Items[];
}
