export interface Pais {
    id          : number;
    name        : string;
}

export interface Estado {
    id          : number;
    idCountry   : number;
    name        : string;
}

export interface Ciudad {
    id          : number;
    idState     : number;
    name        : string;
}
