import { ItemFact } from "./itemFact.model";

export interface Document {
    series:         string;
    cp:             number;
    docNum:         number;
    codClient:      string;
    nomCli:         string;
    ffact:          Date;
    ffactV:         Date;
    subtotal:       number;
    iva:            number;
    docTotal:       number;
    itemsFactura:   ItemFact;
}
