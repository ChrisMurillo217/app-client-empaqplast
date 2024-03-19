export interface General{
    fechaRp                 : Date;
    rucP                    : string;
    razonSocialP            : string;
    direccionP              : string;
    ciudadP                 : number;
    paisP                   : number;
    emailP                  : string;
    nomRlp                  : string;
    paginaWp                : string;
    idNaturaleza            : number;
    actividadEconomicaP     : string;
    nombrePagoBp            : string;
    direccionBp             : string;
    numeroBp                : string;
    codigoAbabp             : string;
    ciudadBp                : number;
    paisBp                  : number;
    tipoCbp                 : string;
    codigoSwiftBp           : string;
    nombreEmpP              : string;
    cargoEmpP               : string;
    fechaEmpP               : Date;
    aceptacionLeyenda       : number;
    registroIp              : string;
}

export interface Informacion{
    rucP                    : string;
    razonSocialP            : string;
    direccionP              : string;
    ciudadP                 : number;
    estadoP                 : number;
    paisP                   : number;
    emailP                  : string;
    nomRlp                  : string;
    paginaWp                : string;
    idNaturaleza            : number;
    actividadEconomicaP     : string;
}

export interface Datos{
    nombrePagoBp            : string;
    direccionBp             : string;
    numeroBp                : string;
    codigoAbabp             : string;
    ciudadBp                : number;
    estadoBp                : number;
    paisBp                  : number;
    tipoCbp                 : string;
    codigoSwiftBp           : string;
}

export interface Elaboracion{
    nombreEmpP              : string;
    cargoEmpP               : string;
}

export interface Terminos{
    aceptacionLeyenda       : number;
}
