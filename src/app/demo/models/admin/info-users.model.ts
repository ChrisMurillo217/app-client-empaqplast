export interface InfoUsers {
    idUsuarioTr?            : number;
    token?                  : string;
    nombreUsuarioTrL        : string;
    contrasenaUsuarioTrL    : string;
    cardCode                : string;
    cardName                : string;
    seriesNameSucursal      : string;
    idDatosU                : number;
    idRol                   : number;
    datos?                  : Data;
}

interface Data {
    idDatosU?               : number;
    nombreUsuarioTr         : string;
    apellidoUsuarioTr       : string;
    emailUsuarioTr          : string;
    telefonoUsuarioTr       : string;
}

