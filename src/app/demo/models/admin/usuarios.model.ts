import { InfoUsers } from "./info-users.model";

export interface Usuarios {
    datosLogin          : InfoUsers;
    seccionPagina       : Secciones[];
}

export interface Secciones {
    idSeccion               : number;
    nombreSeccion           : string;
    idPagina                : number;
    icon                    : string;
    nombrePagina            : string;
    descripcionPagina       : string;
}
