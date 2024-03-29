export interface Certificaciones {
    tipoCertP                   : string;
    normaCertP                  : string;
    nombreCertP                 : string;
    fechaVigenciCertP           : Date;
    obsCertP                    : string;
    idProveedor?                : number;
}

export interface Tipo {
    idCertificacion             : number;
    tipoCertP                   : string;
}

export interface Norma {
    idCertificacion             : number;
    normaCertificacion          : string;
    descripcionCertificacion    : string;
}
