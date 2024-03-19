import { HttpClient }                           from '@angular/common/http';
import { Injectable }                           from '@angular/core';
import { Observable, catchError, throwError }   from 'rxjs';

import { Certificaciones, Tipo, Norma }         from '../../models/proveedores/certificaciones.model';

@Injectable( {
    providedIn: 'root'
} )
export class CertificacionesService {
    urlAPI:             string = 'http://tracking.empaqplast.com:8086/api';

    constructor(
        private __http: HttpClient
    ) { }

    getTipo(): Observable< any > {
        const url = `${ this.urlAPI }/proveedores/certificaciones?pagina=1&elementosPorPagina=10`;
        return this.__http.get< Tipo >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        )
    }

    getNorma(): Observable< any > {
        const url = `${ this.urlAPI }/proveedores/certificaciones/normas?pagina=1&elementosPorPagina=10`;
        return this.__http.get< Norma >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        )
    }

    setCertificaciones( certificacionData: Certificaciones[] ): Observable< any > {
        const url = `${ this.urlAPI }/proveedores/registro/certificaciones`
        return this.__http.post( url, certificacionData ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        )
    }
}
