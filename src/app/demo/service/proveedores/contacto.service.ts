import { Injectable }                           from '@angular/core';
import { HttpClient }                           from '@angular/common/http';
import { Observable, catchError, throwError }   from 'rxjs';

import { Contacto }                             from '../../models/proveedores/contacto.model';

@Injectable( {
    providedIn: 'root'
} )
export class ContactoService {
    urlAPI:             string = 'http://tracking.empaqplast.com:8086/api';

    constructor(
        private __http: HttpClient
    ) { }
    
    setContacto( contactoData: Contacto[] ): Observable< any > {
        const url = `${ this.urlAPI }/proveedores/registro/persona-contacto`
        return this.__http.post( url, contactoData ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        )
    }
}