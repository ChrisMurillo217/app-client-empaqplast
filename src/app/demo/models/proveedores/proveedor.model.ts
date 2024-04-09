export interface Proveedor {
    idProveedor             : number;
    fechaRp                 : string;
    rucP                    : string;
    razonSocialP            : string;
    direccionP              : string;
    paisProveedor           : Pais;
    ciudadProveedor         : Ciudad;
    emailP                  : string;
    nomRlp                  : string;
    paginaWp                : string;
    nombreNaturaleza        : Naturaleza;
    actividadEconomicaP     : string;
    nombrePagoBp            : string;
    direccionBp             : string;
    numeroBp                : string;
    codigoAbabp             : string;
    paisProveedorBanco      : Pais;
    ciudadProveedorBanco    : Ciudad;
    tipoCbp                 : string;
    codigoSwiftBp           : string;
    nombreEmpP              : string;
    cargoEmpP               : string;
    fechaEmpP               : string;
    aceptacionLeyenda       : number;
    registroIp              : string;
}

interface Pais {
    name                    : string;
}
interface Ciudad {
    name                    : string;
}
interface Naturaleza {
    nombreNaturaleza        : string;
}
