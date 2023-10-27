import { Items } from "./item.model";

export interface Pedidos {
    docEntry        : number;
    docNum          : number;
    numAtCard       : string;
    seriesName      : string;
    docStatus       : string;
    docDate         : Date;
    docDueDate      : Date;
    taxDate         : Date;
    cardCode        : string;
    cardName        : string;
    items           : Items;
}
