import { Dates } from "./dates.model";
import { Role } from "./role.model";

export interface InfoUsers {
    token?                  : string;
    nombreUsuarioTrL        : string;
    contrasenaUsuarioTrL    : string;
    cardCode                : string;
    cardName                : string;
    seriesNameSucursal      : string;
    idDatosU                : number;
    idRol                   : number;
    datos                   : Dates;
    rol                     : Role;
}



