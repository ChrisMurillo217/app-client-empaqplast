import { Dates } from "./dates.model";
import { Role } from "./role.model";

export interface InfoUsers {
    idDatosU                : number;
    idRol                   : number;
    nombreUsuarioTrL        : string;
    contrasenaUsuarioTrL    : string;
    cardCode                : string;
    cardName                : string;
    seriesNameSucursal      : string;
    datos                   : Dates;
    rol                     : Role;
}



