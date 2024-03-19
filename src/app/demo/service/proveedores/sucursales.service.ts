import { Injectable }           from '@angular/core';
import { HttpClient }           from '@angular/common/http';

import { Sucursal }             from '../../models/proveedores/sucursal.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable( {
    providedIn: 'root'
} )
export class SucursalesService {
    urlAPI:             string = 'http://tracking.empaqplast.com:8086/api';

    constructor(
        private __http: HttpClient
    ) { }
    
    setSucursales( sucursalesData: Sucursal[] ): Observable< any > {
        const url = `${ this.urlAPI }/proveedores/registro/sucursales`
        return this.__http.post( url, sucursalesData ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        )
    }
}