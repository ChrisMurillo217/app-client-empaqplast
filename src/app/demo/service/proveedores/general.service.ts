import { Injectable }                           from '@angular/core';
import { HttpClient }                           from '@angular/common/http';
import { Observable, catchError, throwError }   from 'rxjs';

import { Ultimo }                               from '../../models/proveedores/ultimoreg.model';
import { Naturaleza }                           from '../../models/proveedores/naturaleza.model';
import { General } from '../../models/proveedores/general.model';

@Injectable( {
    providedIn: 'root'
} )
export class GeneralService {
    urlAPI:             string = 'http://tracking.empaqplast.com:8086/api';

    constructor(
        private __http: HttpClient
    ) { }

    getIPAddress(): Observable< any>  {
        return this.__http.get( 'https://api.ipify.org?format=json' );
    }

    getLastReg(): Observable< any > {
        const url = `${ this.urlAPI }/proveedores/ultimo-numero-registro`;
        return this.__http.get< Ultimo >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        )
    }

    getNaturaleza(): Observable< any > {
        const url = `${ this.urlAPI }/proveedores/naturaleza/lista?pagina=1&elementosPorPagina=10`;
        return this.__http.get< Naturaleza >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        )
    }

    getTerminos(): Observable< any > {
        const url = `${ this.urlAPI }/proveedores/consulta-aceptar-terminos`;
        return this.__http.get< any >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        )
    }

    setGeneral( generalData: General ): Observable< any > {
        const url = `${ this.urlAPI }/proveedores/registro/general`
        return this.__http.post( url, generalData ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        )
    }
}
