import { InfoUsers } from "./info-users.model";

export interface Usuarios {
    datosLogin          : InfoUsers;
    seccionPagina       : Secciones;
}

export interface Secciones {
    idSeccion               : number;
    nombreSeccion           : string;
    idPagina                : number;
    nombrePagina            : string;
    descripcionPagina       : string;
}
