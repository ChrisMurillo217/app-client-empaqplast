import { Injectable }                           from '@angular/core';
import { HttpClient }                           from '@angular/common/http';
import { Observable, catchError, throwError }   from 'rxjs';

import { Clientes }                             from '../../models/proveedores/clientes.model';

@Injectable( {
    providedIn: 'root'
} )
export class ClienteService {
    urlAPI:             string = 'http://tracking.empaqplast.com:8086/api';

    constructor(
        private __http: HttpClient
    ) { }
    
    setCliente( clienteData: Clientes[] ): Observable< any > {
        const url = `${ this.urlAPI }/proveedores/registro/clientes-principales-proveedor`
        return this.__http.post( url, clienteData ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        )
    }
}