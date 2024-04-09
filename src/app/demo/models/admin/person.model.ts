export interface Person {
    nombreUsuarioTr         : string;
    apellidoUsuarioTr       : string;
    direccionUsuarioTr      : string;
    emailUsuarioTr          : string;
    telefonoUsuarioTr       : string;
    cardCode                : string;
    seriesNameSucursal      : string;
    cardName                : string;
    tipoUsuario             : number;
}

export interface Tipos {
    idTipoUsuario           : number;
    nombreTipoUsuario       : string;
}

export interface Socios {
    cardType                : string;
    cardCode                : string;
    cardName                : string;
}
