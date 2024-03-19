export interface GuiaInfo {
    metadata:           string;
    nextLink:           string;
    value:              GuiaValue;
}

export interface GuiaValue {
    DocNum:             number;
    DocDate:            Date;
    DocDueDate:         Date;
    CardCode:           string;
    CardName:           string;
    Address:            string;
}
