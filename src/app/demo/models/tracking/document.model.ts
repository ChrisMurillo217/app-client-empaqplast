import { ItemFact } from "./itemFact.model";

export interface Document {
    series          : string;
    cp              : number;
    docNum          : number;
    codClient       : string;
    nomCli          : string;
    autoSri         : string;
    unDocsri        : string;
    uFormaPago      : string;
    pymntGroup      : string;
    noGuia          : string;
    comments        : string;
    address         : string;
    eMail           : string;
    cellular        : string;
    vendedor        : string;
    ffact           : Date;
    ffactV          : Date;
    subtotal        : number;
    iva             : number;
    docTotal        : number;
    itemsFactura    : ItemFact;
}
