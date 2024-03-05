import { Injectable }                               from '@angular/core';
import { HttpClient }                               from '@angular/common/http';
import { Observable, catchError, throwError }       from 'rxjs';

import { Pais, Estado, Ciudad }                     from '../../models/geolocation.model'

@Injectable( {
    providedIn: 'root'
} )
export class GeolocationService {
    urlAPI:             string = 'http://tracking.empaqplast.com:8086/api';

    constructor(
        private __http: HttpClient
    ) { }

    getPais(): Observable< any > {
        const url = `${ this.urlAPI }/paises`;
        return this.__http.get< Pais >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        )
    }
    getEstado( idPais: number ): Observable< any > {
        const url = `${ this.urlAPI }/provincias/${ idPais }`;
        return this.__http.get< Estado >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        )
    }
    getCiudad( idEstado: number ): Observable< any > {
        const url = `${ this.urlAPI }/ciudades/${ idEstado }`;
        return this.__http.get< Ciudad >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        )
    }
}
